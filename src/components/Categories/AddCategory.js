import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "customHooks/useFirestore";
import { useCollection } from "customHooks/useCollection";

const AddCategory = ({ show, handleClose }) => {
  const { addDocument, response } = useFirestore("categories");
  const { documents } = useCollection("categories", [
    "createdAt",
    "desc",
  ]);

  const [form, setForm] = useState({
    description: "",
  });

  const handleReset = () => {
    setForm({
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = `#${form.description.split(" ").join("").toLowerCase()}`;
    const doc = { ...form, code };

    const categoryExist = documents.find((doc) => doc.code === code);

    if(categoryExist) {
      return toast.error(`"${form.description}" category already exist.`)
    }

    addDocument(doc);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(`Successfully added ${form.description}.`);

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
          <Modal.Title>Add Category</Modal.Title>
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
              placeholder="e.g Shopping"
            />
          </Form.Group>
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

export default AddCategory;
