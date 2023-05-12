import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "customHooks/useFirestore";

const AddIncome = ({ show, handleClose }) => {
  const { addDocument, response } = useFirestore("transactions");

  const [form, setForm] = useState({
    description: "",
    plan: "Deposit",
    category: "#income",
    amount: 0,
  });

  const handleReset = () => {
    setForm({
      description: "",
      plan: "Deposit",
      category: "#income",
      amount: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let doc = { ...form, amount: parseInt(form.amount) };

    addDocument(doc);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(`Successfully deposit $${form.amount}.`);

    handleReset();
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Income Source</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g Salary"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              required
              min={1}
              max={10000}
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount..."
            />
          </Form.Group>
          <div className="d-flex">
            <button
              type="submit"
              className="ms-auto mt-2 text-light rounded bg-success border-0 p-2"
              disabled={response.isPending}
            >
              {!response.isPending ? "Deposit" : "Loading..."}
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

export default AddIncome;
