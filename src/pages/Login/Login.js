import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useLogin } from "../../customHooks/useLogin";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/functions";

const Login = () => {
  //states for email and password
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = await login(form.email, form.password);
    if (error) {
      return toast.error(getErrorMessage(error));
    }

    toast.success("Login successfully.")
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="login-form shadow">
        <h3 className="text-center fw-bold mb-4">Login Here!</h3>
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
        <button
          type="submit"
          disabled={isLoading}
          className="my-2 login-button"
        >
          {!isLoading ? "Login" : "Loading..."}
        </button>
        <button
          type="reset"
          className="ms-3 my-2 reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
        <p className="text-center mt-3">
          Not a member{" "}
          <Link to={"/signup"} className="register-btn">
            Register Now!
          </Link>
        </p>
      </Form>
    </div>
  );
};
export default Login;
