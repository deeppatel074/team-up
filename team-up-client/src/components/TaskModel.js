import "../App.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function TaskModel() {
  let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const createWs = async () => {
    // try {
    //   let wpName = document.getElementById("wsName").value;
    //   wpName = wpName.trim();
    //   const param = {
    //     name: wpName,
    //   };
    //   if (wpName.length < 5) alert("Name must be at least 5 letters long");
    //   else {
    //     const idToken = await firebase.auth().currentUser.getIdToken();
    //     const header = {
    //       headers: {
    //         Authorization: "Bearer " + idToken,
    //       },
    //     };
    //     const { data } = await axios.post(
    //       "http://localhost:4000/workspace/",
    //       param,
    //       header
    //     );
    //     console.log(data);
    //     document.getElementById("wsName").value = "";
    //     navigate(`/workspace/${data._id}`);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              id="description"
              name="description"
              autoFocus
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              id="startDate"
              name="startDate"
              autoFocus
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              id="endDate"
              name="endDate"
              autoFocus
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/workspaces">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Link>
        <Button onClick={createWs} variant="primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModel;
