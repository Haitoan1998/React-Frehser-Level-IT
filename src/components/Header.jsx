import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoApp from "../assets/vite.svg";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const nav = useNavigate();
  const { logout, user } = useContext(UserContext);
  console.log(user);
  const handleLogout = () => {
    logout();
    nav("/login");
    toast.success("logout successfully");
  };

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
            {(user && user.auth === true) ||
            window.location.pathname === "/" ? (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" active>
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Manage users
                  </NavLink>{" "}
                </Nav>
                <Nav>
                  {user && user.auth === true ? (
                    <span className="nav-link">Hello : {user.email}</span>
                  ) : null}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item
                        className="dropdown-item"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
