import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Meetings() {
  const { id } = useParams();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  const createSchedule = () => {};
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create Schedule</Modal.Title>
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
              placeholder="Add Description and Link of meeting"
              id="description"
              name="description"
              autoFocus
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              id="startDate"
              name="startDate"
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
          <Button onClick={createSchedule} variant="primary">
            Create
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default Meetings;
