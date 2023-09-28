import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoApp from "../assets/vite.svg";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            APP
            <img
              src={logoApp}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link" active>
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Manage users
              </NavLink>{" "}
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
