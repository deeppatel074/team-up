import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { doSignOut } from '../firebase/FirebaseFunctions';
import '../App.css';

const createSignOut = () => {
  return (
    <li>
      <NavLink to='/' onClick={doSignOut}> Sign Out</NavLink>
    </li>
  );
}

const createNav = (Name, dest) => {
  return (
    <li>
      <NavLink to={dest}>{Name}</NavLink>
    </li>
  )
}

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  let landing = createNav("Landing", "/");
  let signup = createNav("Sign Up", "/users/signup");
  let login = createNav("Log In", "/users/login");
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
    <nav className='navigation'>
      <ul>
        {landing}
        {signup}
        {login}
        {account}
        {workspaces}
        {createWorkspace}
        {signOut}
      </ul>
    </nav>
  );
};

export default Navigation;