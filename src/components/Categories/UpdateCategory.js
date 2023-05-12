import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "customHooks/useFirestore";
import { useCollection } from "customHooks/useCollection";

const UpdateCategory = ({
  show,
  handleClose,
  category: { description, code, id },
}) => {
  const { updateDocument, deleteDocument, response } =
    useFirestore("categories");

  const { documents } = useCollection("categories", ["createdAt", "desc"]);

  const [form, setForm] = useState({ description, code });

  useEffect(() => {
    setForm({ description, code });
  }, [description, code]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const codee = `#${form.description.split(" ").join("").toLowerCase()}`;
    const doc = { ...form, codee };

    const categoryExist = documents.find((doc) => doc.code === codee && doc.code !== code);

    if(categoryExist) {
      return toast.error(`"${form.description}" category already exist.`)
    }

    updateDocument(doc, id);
    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Category updated successfully!");
    handleClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteDocument(id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Category deleted successfully!");
    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              onChange={handleChange}
              value={form.description}
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

export default UpdateCategory;
