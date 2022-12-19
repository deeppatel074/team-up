import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "../App.css";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { Button, Card, Form, ListGroup, Badge } from "react-bootstrap";
function Workspace() {
  const [ws, setWS] = useState(undefined);
  const [getMembers, SetMembers] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const getWS = async (id) => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.get(
          `http://localhost:4000/workspace/${id}`,
          header
        );
        setWS(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getWS(id);
  }, [id]);

  useEffect(() => {
    const getMembersData = async (id) => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.get(
          `http://localhost:4000/workspace/${id}/members`,
          header
        );
        SetMembers(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getMembersData(id);
  }, [id]);

  let name = "Not Found";
  if (ws) name = ws.name;

  const handleInvite = async (e) => {
    try {
      let email = document.getElementById("email").value;
      email = email.trim();
      const param = {
        email: email,
      };
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.post(
          "http://localhost:4000/workspace/" + id + "/invite",
          param,
          header
        );
        console.log(data);
      } else {
        alert("Enter Valid Email");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buildMembersList = (members) => {
    return (
      <ListGroup.Item
        key={members.members.id[0]._id}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {members.members.id[0].name
              ? members.members.id[0].name
              : "Unregister User"}
          </div>
          Role: {members.members.role}
        </div>
        {members.members.status === 1 ? (
          <Badge bg="success" className="mt-3" pill>
            Active
          </Badge>
        ) : (
          <Badge bg="warning" className="mt-3" pill>
            Invitation Pending
          </Badge>
        )}
      </ListGroup.Item>
    );
  };
  let memeberList = undefined;
  if (getMembers) {
    console.log(getMembers);
    memeberList = (
      <ListGroup as="ol" numbered>
        {getMembers.map((elem) => {
          return buildMembersList(elem);
        })}
      </ListGroup>
    );
  }

  return (
    <div>
      <WorkspaceNavBar data={{ id: id, active: "1" }} />
      <div className="row text-center mt-4">
        <h1 className="h3">{name}</h1>
      </div>
      <div className="row">
        <div className="col-4 sm-4" sm={4}>
          {" "}
          <Card className="text-center card" style={{ marginTop: "20px" }}>
            <Card.Body style={{ marginTop: "20px" }}>
              <Card.Title>Invite Member to Workspace</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Enter email of user"
                    name="email"
                  />
                </Form.Group>
              </Form>
              <Button variant="dark" onClick={handleInvite}>
                Invite
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-8 sm-8" sm={8}>
          <Card className="text-center card" style={{ marginTop: "20px" }}>
            <Card.Body>
              <Card.Title>Members</Card.Title>

              {memeberList}
              {/* <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Role: User
                  </div>
                  <Badge bg="success" className="mt-3" pill>
                    Active
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Role: User
                  </div>
                  <Badge bg="warning" className="mt-3" pill>
                    Invitation Pending
                  </Badge>
                </ListGroup.Item> */}
              {/* </ListGroup> */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
