import "../App.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Workspaces() {
  const [ws, setWS] = useState(undefined);

  useEffect(() => {
    const getWS = async () => {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const userID = Cookies.get("user");
      const header = {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      };
      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/${userID}/workspace`,
          header
        );
        setWS(data);
      } catch (e) {
        console.log(e);
        alert(e.response.data.error);
      }
    };
    // if (getUser) {
    getWS();
    // }
  }, []);

  let op = undefined;
  let createNew = (
    <div className="col">
      <Card
        className="text-center card"
        style={{ width: "18rem", height: "13rem", marginTop: "20px" }}
      >
        <Card.Body style={{ marginTop: "50px" }}>
          <Card.Title>Create New Workspace</Card.Title>
          <Link to="/workspaces/create">
            <Button variant="dark">Create</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );

  if (ws && ws.length !== 0) {
    const user = Cookies.get("user");
    op = ws.map((d) => {
      let role = "Member";
      let settingsBtn = null;
      let deleteBtn = null;
      if (user === d.createdBy) {
        role = "Admin";
        settingsBtn = <Button variant="secondary">Settings</Button>;
        deleteBtn = <Button variant="danger">Delete</Button>;
      }
      return (
        <div className="col" key={d._id}>
          <Card
            className="text-center card"
            style={{ width: "18rem", height: "13rem", marginTop: "20px" }}
          >
            <Card.Body style={{ marginTop: "50px" }}>
              <Link className="link" to={`/workspace/${d._id}`}>
                <Card.Title> {d.name}</Card.Title>
                <Card.Text className="h6 ">
                  Members: {d.members.length}
                </Card.Text>
                <Card.Text className="h6 ">Role: {role}</Card.Text>
              </Link>
            </Card.Body>
          </Card>
        </div>
      );
    });
  }
  return (
    <div className="d-flex justify-content-md-center mt-4 container row">
      {createNew}
      {op}
    </div>
  );
}

export default Workspaces;
