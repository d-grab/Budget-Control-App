import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbarr from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Menu } from "../../utils/Icons";
import NavItems from "./NavItems";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="menu-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            £ Budget App
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Nav>
            <NavItems />
          </Nav>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <header className="header">
      <Navbarr variant="dark" className="navbar shadow">
        <Container fluid>
          <Navbarr.Brand as={Link} to="/">
            £ Budget App
          </Navbarr.Brand>

          <Nav className="menu-nav ms-auto d-none d-md-flex">
            <NavItems />
          </Nav>

          <Button
            variant="light"
            className="d-md-none menu"
            onClick={() => setModalShow(true)}
          >
            <Menu />
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onClick={() => setModalShow(false)}
            className="d-md-none"
          />
        </Container>
      </Navbarr>
    </header>
  );
};

export default Navbar;
