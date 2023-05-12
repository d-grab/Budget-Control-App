import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSignup } from "../../customHooks/useSignup";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/functions";

const Signup = () => {
  //states for email and password
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password should be of 6 characters!?");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setForm({ ...form, confirmPassword: "" });
      toast.error("Confirm Password is not match!?");
      return;
    }

    let error = await signup(form.email, form.password, form.username);

    if (error) {
      return toast.error(getErrorMessage(error));
    }

    toast.success("Signup successfully.")
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="signup-container">
      <Form onSubmit={handleSubmit} className="signup-form shadow">
        <h3 className="text-center fw-bold mb-3">Signup Here!</h3>
        <p className="text-center mb-3">
          Already a member{" "}
          <Link to={"/login"} className="login-btn">
            Login Now!
          </Link>
        </p>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="johnsmith"
            onChange={handleChange}
            name="username"
            value={form.username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="johnsmith@example.com"
            onChange={handleChange}
            name="email"
            value={form.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="current-password webauthn"
            onChange={handleChange}
            name="password"
            value={form.password}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            autoComplete="current-password webauthn"
            onChange={handleChange}
            name="confirmPassword"
            value={form.confirmPassword}
            required
          />
        </Form.Group>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 signup-button"
        >
          {!isLoading ? "Signup" : "Loading..."}
        </button>
        <button
          type="reset"
          className="ms-3 mt-2 reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </Form>
    </div>
  );
};
export default Signup;
