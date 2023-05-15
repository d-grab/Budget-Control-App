import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "customHooks/useFirestore";
import { CalculateBalance } from "utils/CalculateBalance";
import { useCollection } from "customHooks/useCollection";

const UpdatePlan = ({
  show,
  handleClose,
  plan: { title, category, currentAmount, budgetAmount, id },
}) => {
  const { updateDocument, deleteDocument, response } = useFirestore("plans");
  const { updateDocument: updateTransaction } = useFirestore("transactions");
  const { currentBalance } = CalculateBalance();

  const { documents: categories, error: categoriesError } = useCollection(
    "categories",
    ["createdAt", "desc"]
  );

  const { documents: transactions } = useCollection("transactions", [
    "createdAt",
    "desc",
  ]);

  const [form, setForm] = useState({ title, category, budgetAmount });

  useEffect(() => {
    setForm({ title, category, budgetAmount });
  }, [title, category, budgetAmount]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (form.category === "") {
      return toast.error("Please select a category!");
    }

    if (form.category !== category || form.title !== title) {
      transactions.forEach((trans) => {
        if (trans.planId === id) {
          updateTransaction(
            {
              category: form.category,
              plan: form.title,
            },
            trans.id
          );
        }
      });
    }

    // Response Object
    updateDocument({ ...form, currentAmount: parseInt(form.currentAmount) ,budgetAmount: parseInt(form.budgetAmount) }, id);
    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Plan updated successfully!");
    handleClose();
  };
  const handleDelete = (e) => {
    e.preventDefault();

    transactions.forEach((trans) => {
      if (trans.planId === id) {
        updateTransaction(
          {
            planId: "",
            plan: "no-plan",
            category: "#outcome",
          },
          trans.id
        );
      }
    });

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Plan deleted successfully!");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {categoriesError && toast.error(categoriesError)}
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              name="title"
              onChange={handleChange}
              value={form.title}
              placeholder="London Tour"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Budget Amount (Max-Limit:{" "}
              <span className="text-primary">
                £{parseInt(parseInt(currentBalance) + parseInt(budgetAmount))}
              </span>
              )
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={currentAmount === 0 ? currentAmount + 1 : currentAmount}
              max={currentBalance + budgetAmount}
              name="budgetAmount"
              onChange={handleChange}
              value={form.budgetAmount}
              placeholder="Enter amount..."
            />
          </Form.Group>

          <Form.Label>Category</Form.Label>
          <Form.Select
            className="mb-3"
            name="category"
            onChange={handleChange}
            value={form.category}
          >
            <option value={""}>Choose...</option>
            {categories?.map((category, idx) => {
              return (
                <option value={category.code} key={idx}>
                  {category.description}
                </option>
              );
            })}
          </Form.Select>

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

export default UpdatePlan;
