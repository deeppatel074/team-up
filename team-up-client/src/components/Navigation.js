import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const createSignOut = () => {
  return (
    <Link className="nav-link link" to="/login" onClick={doSignOut}>
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

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  let signup = createNav("Sign Up", "/signup");
  let login = createNav("Log In", "/login");
  let account = null;
  let workspaces = null;
  let createWorkspace = null;
  let signOut = null;
  if (currentUser) {
    signup = null;
    login = null;
    account = createNav("Account", "/account");
    workspaces = createNav("Workspaces", "/workspaces");
    createWorkspace = createNav("Create Workspace", "/createworkspace");
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
            {workspaces}
            {createWorkspace}
          </Nav>
          <Nav>
            {account}
            {signOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
