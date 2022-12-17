import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Navigation from "./Navigation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Workspaces from "./Workspaces";
import Workspace from "./Workspace";
import CreateWorkspace from "./CreateWorkspace";
import { AuthProvider } from "../firebase/Auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
        </div>
        <Routes>
          <Route path="/account" element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/workspaces" element={<PrivateRoute />}>
            <Route path="/workspaces" element={<Workspaces />} />
          </Route>
          <Route path="/workspace/:id" element={<PrivateRoute />}>
            <Route path="/workspace/:id" element={<Workspace />} />
          </Route>
          <Route path="/workspaces/create" element={<PrivateRoute />}>
            <Route path="/workspaces/create" element={<CreateWorkspace />} />
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
