import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCollection } from "customHooks/useCollection";
import { useFirestore } from "customHooks/useFirestore";
import { CalculateBalance } from "utils/CalculateBalance";

const AddSpendingModal = ({ show, handleClose }) => {
  const { documents } = useCollection("plans", ["createdAt", "desc"]);
  const { addDocument, response } = useFirestore("transactions");
  const { updateDocument, response: updateResponse } = useFirestore("plans");

  const { documents: categories, error: categoriesError } = useCollection(
    "categories",
    ["createdAt", "desc"]
  );

  const { currentBalance } = CalculateBalance();

  const [form, setForm] = useState({
    description: "",
    amount: 0,
    plan: "no-plan",
    category: "",
    planId: "",
  });

  const handleReset = () => {
    setForm({
      description: "",
      amount: 0,
      plan: "no-plan",
      category: "",
      planId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let doc = { ...form, amount: parseInt(form.amount) };

    if (doc.plan === "no-plan" && doc.category === "") {
      return toast.warning("Please select a category or plan.");
    }

    if (doc.plan !== "no-plan") {
      const plan = documents[form.plan];
      doc.plan = plan.title;
      doc.planId = plan.id;
      doc.category = plan.category;

      updateDocument(
        {
          currentAmount: parseInt(
            parseInt(plan.currentAmount) + parseInt(doc.amount)
          ),
        },
        plan.id
      );
    }

    addDocument(doc);

    if (response.error || updateResponse.error) {
      return toast.error(response.error);
    }

    toast.success(`$${form.amount} credit Successfully.`);

    handleReset();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getMaxLimit = () => {
    if (form.plan !== "no-plan") {
      const maxLimit = documents[form.plan].budgetAmount - documents[form.plan].currentAmount;
      return maxLimit;
    }
    return currentBalance;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {categoriesError && toast.error(categoriesError)}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Spending</Modal.Title>
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
              placeholder="House Rent"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Spend Amount (Limit:{" "}
              <span className="text-primary">£{parseInt(getMaxLimit())}</span>)
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={parseInt(getMaxLimit())}
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
              value={form.category}
              disabled={form.plan !== "no-plan"}
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
              name="plan"
              onChange={handleChange}
              value={form.plan}
              disabled={form.category !== ""}
            >
              <option value="no-plan">Choose...</option>
              {documents?.map((plan, idx) => {
                return (
                  <option value={idx} key={idx}>
                    {plan.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-danger border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Credit" : "Loading..."}
            </button>
            <button
              type="button"
              className="ms-3 mt-2 text-light rounded bg-secondary border-0  p-2"
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

export default AddSpendingModal;
