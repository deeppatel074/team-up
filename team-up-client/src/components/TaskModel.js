import "../App.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function TaskModel() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const createTask = async () => {
    try {
      let title = document.getElementById("title").value.trim();
      let description = document.getElementById("description").value.trim();
      let startDate = document.getElementById("startDate").value.trim();
      let endDate = document.getElementById("endDate").value.trim();
      const data = {
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
      };
      data.startDate = data.startDate.substr(0, 10);
      data.endDate = data.endDate.substr(0, 10);
      if (data.title.length === 0) alert("Title cannot be empty");
      else if (data.description.length === 0) alert("Description cannot be empty");
      else if (data.startDate.length === 0) alert("Start Date cannot be empty");
      else if (data.endDate.length === 0) alert("End Date cannot be empty");
      else {
        let sd = Date.parse(data.startDate);
        let ed = Date.parse(data.endDate);
        if (ed < sd) alert("End start can not be before start date");
        else {
          const idToken = await firebase.auth().currentUser.getIdToken();
          const header = {
            headers: {
              Authorization: "Bearer " + idToken,
            },
          };
          console.log(id);
          const res = await axios.post(
            `http://localhost:4000/workspace/task/${id}`,
            data,
            header
          );
          console.log(res);
        }
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
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
        <Link to={`/workspace/${id}/tasks`}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={createTask} variant="primary">
            Create
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModel;
