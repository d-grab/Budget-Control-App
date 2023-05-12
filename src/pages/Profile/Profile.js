import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { useUpdateProfile } from "customHooks/useUpdateProfile";
import { getErrorMessage } from "utils/functions";

const Profile = () => {
  const { user } = useAuthContext();
  const { UpdateProfile, isLoading } = useUpdateProfile();

  const [form, setForm] = useState({
    username: user.displayName,
    email: user.email,
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword.length > 0 && form.newPassword.length < 6) {
      toast.error("Password should be of 6 characters!?");
      return;
    }

    const updates = {};

    if (form.username !== user.displayName) {
      updates.displayName = form.username;
    }

    if (form.email !== user.email) {
      updates.email = form.email;
    }

    if (form.newPassword.length >= 6) {
      updates.password = form.newPassword;
    }

    if (!updates.displayName && !updates.email && !updates.password) {
      return toast.success("No Updates!");
    }

    const error = await UpdateProfile(updates);

    if (error) {
      const errorMsg = getErrorMessage(error);
      if (errorMsg === "requires-recent-login") {
        return toast.error("Please re-login to update your profile. (Security Verifications.)");
      }
      return toast.error(getErrorMessage(errorMsg));
    }

    setForm({ ...form, newPassword: "" });
    toast.success("Profile updated successfully.");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <Form onSubmit={handleSubmit} className="profile-form shadow">
        <h3 className="text-center fw-bold mb-3">My Profile</h3>
        <p className="m-0 text-center mb-3">
          You can also update your Profile here.
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
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            autoComplete="current-password webauthn"
            onChange={handleChange}
            name="newPassword"
            value={form.newPassword}
          />
        </Form.Group>
        <div className="d-flex">
          <button
            type="submit"
            className="ms-auto mt-2 save-button"
            disabled={isLoading}
          >
            {!isLoading ? "Save" : "Loading..."}
          </button>
          <Link to={"/"} className="ms-3 mt-2 text-light rounded bg-secondary border-0 p-2 text-decoration-none">
            Back
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
