import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "customHooks/useFirestore";
import { CalculateBalance } from "utils/CalculateBalance";
import { useCollection } from "customHooks/useCollection";

const AddPlan = ({ show, handleClose }) => {
  const { addDocument, response } = useFirestore("plans");
  const { documents, error } = useCollection("categories", [
    "createdAt",
    "desc",
  ]);

  const { currentBalance } = CalculateBalance();

  const [form, setForm] = useState({
    title: "",
    budgetAmount: 0,
    category: "",
    currentAmount: 0,
  });

  const handleReset = () => {
    setForm({
      title: "",
      budgetAmount: 0,
      category: "",
      currentAmount: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (documents.length === 0) {
      return toast.warning("You do not have any category.");
    }

    if (currentBalance === 0) {
      return toast.warning(`Your current balance is $ ${currentBalance}`);
    }

    if (form.category === "") {
      return toast.error("Please select a category!");
    }

    // Response Object
    addDocument({...form, currentAmount: parseInt(form.currentAmount) ,budgetAmount: parseInt(form.budgetAmount) });

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Plan added successfully!");

    handleReset();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {error && toast.error(error)}
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Plan</Modal.Title>
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
              <span className="text-primary">${currentBalance}</span>)
            </Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={currentBalance}
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
            {documents?.map((category, idx) => {
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
              className="ms-auto mt-2 text-light rounded bg-success border-0 py-2 px-3"
              disabled={response.isPending}
            >
              {!response.isPending ? "ADD" : "Loading..."}
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

export default AddPlan;
