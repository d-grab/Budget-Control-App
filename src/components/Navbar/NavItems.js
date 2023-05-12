import { useAuthContext } from "customHooks/useAuthContext";
import { useLogout } from "customHooks/useLogout";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavItems = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
  return (
    <>
      {!user && (
        <>
          <Nav.Link as={Link} to="/signup">
            Signup
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </>
      )}
      {user && (
        <>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/plans">
            Plans
          </Nav.Link>
          <Nav.Link as={Link} to="/categories">
            Categories
          </Nav.Link>
          <Nav.Link as={Link} to="/transactions">
            Trans.
          </Nav.Link>
          <Nav.Link as={Link} to="/graphs">
            Graphs
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profile<span className="d-md-none">: {user.displayName}</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={logout}>
            Logout
          </Nav.Link>
        </>
      )}
    </>
  );
};

export default NavItems;