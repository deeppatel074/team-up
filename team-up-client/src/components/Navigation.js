import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  const createSignOut = () => {
    return (
      <Link className="nav-link link" onClick={handleLogout}>
        Sign Out
      </Link>
    );
  };

  const createNav = (Name, dest) => {
    return (
      <Link className="nav-link link" to={dest}>
        {Name}
      </Link>
    );
  };

  let signup = createNav("Sign Up", "/signup");
  let login = createNav("Log In", "/login");
  let account = null;
  let workspaces = null;
  let signOut = null;
  if (currentUser) {
    signup = null;
    login = null;
    account = createNav("Account", "/accounts");
    workspaces = createNav("Workspaces", "/workspaces");
    signOut = createSignOut();
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand> Team Up</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {signup}
            {login}
          </Nav>
          <Nav>
            {workspaces}
            {account}
            {signOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
