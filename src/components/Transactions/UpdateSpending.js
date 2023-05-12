import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCollection } from "customHooks/useCollection";
import { useFirestore } from "customHooks/useFirestore";
import { CalculateBalance } from "utils/CalculateBalance";

const UpdateSpending = ({
  show,
  handleClose,
  transaction: { description, amount, plan, planId, category, id },
}) => {
  const { documents } = useCollection("plans", ["createdAt", "desc"]);
  const { documents: categories } = useCollection("categories", [
    "createdAt",
    "desc",
  ]);
  const { updateDocument, deleteDocument, response } =
    useFirestore("transactions");

  const { updateDocument: updatePlan } = useFirestore("plans");
  const { currentBalance } = CalculateBalance();

  const [form, setForm] = useState({
    description,
    amount,
    plan,
    planId,
    category,
  });

  useEffect(() => {
    setForm({ description, amount, plan, planId, category });
  }, [description, amount, plan, planId, category]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (form.planId === "" && form.category === "") {
      return toast.error("Please select a category or plan.");
    }

    // form.planId should be "".
    if (form.category !== "" && form.planId === "") {
      form.plan = "no-plan";

      // If any previuos plan.
      if (planId !== "") {
        const plann = documents.find((doc) => doc.id === planId);
        updatePlan(
          {
            currentAmount: parseInt(
              parseInt(plann.currentAmount) - parseInt(amount)
            ),
          },
          planId
        );
      }

      // form.category should be "" & form.planId must have an ID.
    } else if (form.planId !== "") {
      const formPlan = documents.find((doc) => doc.id === form.planId);
      form.plan = formPlan.title;
      form.category = formPlan.category;

      if (planId === "") {
        updatePlan(
          {
            currentAmount: parseInt(
              parseInt(formPlan.currentAmount) + parseInt(form.amount)
            ),
          },

          form.planId
        );
      } else if (planId !== "") {
        const previousPlan = documents.find((doc) => doc.id === planId);

        if (form.planId === planId) {
          const currentAmount = parseInt(
            parseInt(previousPlan.currentAmount) -
              parseInt(amount) +
              parseInt(form.amount)
          );

          updatePlan(
            {
              currentAmount,
            },
            form.planId
          );
        } else if (form.planId !== planId) {
          const previousPlan = documents.find((doc) => doc.id === planId);
          const formPlan = documents.find((doc) => doc.id === form.planId);
          updatePlan(
            {
              currentAmount: formPlan.currentAmount + parseInt(form.amount),
            },
            form.planId
          );

          updatePlan(
            {
              currentAmount: previousPlan.currentAmount - parseInt(form.amount),
            },
            planId
          );
        }
      }
    }

    updateDocument({ ...form, amount: parseInt(form.amount) }, id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Transaction updated successfully.");
    handleClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (planId !== "") {
      const plann = documents.find((doc) => doc.id === planId);
      updatePlan(
        {
          currentAmount: parseInt(
            parseInt(plann.currentAmount) - parseInt(amount)
          ),
        },
        planId
      );
    }

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Transaction deleted successfully!");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getMaxLimit = () => {
    if (form.planId !== "") {
      const plann = documents?.find((doc) => doc.id === form.planId);

      let maxLimit = parseInt(plann?.budgetAmount - plann?.currentAmount);

      if (form.planId === planId) {
        maxLimit = maxLimit + parseInt(amount);
      }
      return maxLimit;
    }
    return currentBalance + parseInt(amount);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Spending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Rent of house"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Spend Amount (Max-Limit:{" "}
              <span className="text-primary">${parseInt(getMaxLimit())}</span>)
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={getMaxLimit()}
              name="amount"
              value={form.amount}
              placeholder="Enter amount..."
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              onChange={handleChange}
              value={form.planId ? "" : form.category}
              disabled={form.planId}
            >
              <option value="">Choose...</option>
              <option value="#outcome">Outcome</option>
              {categories?.map((category, idx) => {
                return (
                  <option value={category.code} key={idx}>
                    {category.description}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <div className="text-danger">(OR)</div>

          <Form.Group className="mt-2 mb-3">
            <Form.Label>Plan</Form.Label>
            <Form.Select
              name="planId"
              onChange={handleChange}
              value={form.planId}
              disabled={!form.planId && form.category}
            >
              <option value="">Choose...</option>
              {documents?.map((plan, idx) => {
                return (
                  <option value={plan.id} key={idx}>
                    {plan.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Update" : "Loading..."}
            </button>
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
              onClick={handleDelete}
            >
              {!response.isPending ? "Delete" : "Loading..."}
            </button>
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-secondary border-0 p-2"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default UpdateSpending;
