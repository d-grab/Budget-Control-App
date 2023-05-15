import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "customHooks/useFirestore";
import { CalculateBalance } from "utils/CalculateBalance";

const UpdateIncome = ({
  show,
  handleClose,
  transaction: { description, amount, id },
}) => {
  const { updateDocument, deleteDocument, response } =
    useFirestore("transactions");

  const { currentBalance } = CalculateBalance();

  const [form, setForm] = useState({
    description,
    amount,
  });

  useEffect(() => {
    setForm({ description, amount });
  }, [description, amount]);

  // Update Income transaction.
  const handleUpdate = (e) => {
    e.preventDefault();

    // if (form.amount > currentBalance) {
    //   return toast.success("Transaction can not be Zero(0).");
    // }

    updateDocument({ ...form, amount: parseInt(form.amount) }, id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Transaction updated successfully.");
    handleClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (amount > currentBalance) {
      return toast.error("You have already spend from this transactions!.");
    }

    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Transaction deleted successfully.");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getMinLimit = () => {

    if( currentBalance >= amount ){
        return 1;
    }

    return amount - currentBalance
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Income</Modal.Title>
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

          <Form.Group className="mb-3">
            <Form.Label>Amount (Min-Limit:{" "}
              <span className="text-primary">£{parseInt(getMinLimit())}</span>)</Form.Label>
            <Form.Control
              type="number"
              required
              min={getMinLimit()}
              max={100000}
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

export default UpdateIncome;
