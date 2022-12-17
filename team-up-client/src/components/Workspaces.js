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
      const userID = Cookies.get("user");
      const idToken = await firebase.auth().currentUser.getIdToken();
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
      }
    };
    getWS();
  }, []);

  console.log(ws);

  let op = undefined;

  if (ws && ws.length !== 0) {
    op = ws.map((d) => {
      return (
        <div className="col" key={d._id}>
          <Card
            className="text-center card"
            style={{ width: "18rem", height: "13rem", marginTop: "20px" }}
          >
            <Link className="link" to={`/workspace/${d._id}`}>
              <Card.Body style={{ marginTop: "50px" }}>
                <Card.Title> {d.name}</Card.Title>
                <Card.Text className="h6 ">
                  Members: {d.members.length}
                </Card.Text>
                <Card.Text className="h6 ">Role: </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </div>
      );
    });
  }

  return (
    <div className="d-flex justify-content-md-center mt-4 container row">
      <div className="col">
        <Card
          className="text-center card"
          style={{ width: "18rem", height: "13rem", marginTop: "20px" }}
        >
          <Card.Body style={{ marginTop: "50px" }}>
            <Card.Title>Create New Workspace</Card.Title>
            <Link to="/workspaces/create">
              <Button variant="primary">Create</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      {op}
    </div>
  );
}

export default Workspaces;
