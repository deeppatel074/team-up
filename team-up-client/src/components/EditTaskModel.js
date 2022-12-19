import "../App.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function EditTaskModel() {
    const { id, taskID } = useParams();
    let navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [task, setTask] = useState(undefined);
    let prevTitle = "Title";
    let prevDesc = "Description"

    useEffect(() => {
        const getTask = async () => {
            try {
                const idToken = await firebase.auth().currentUser.getIdToken();
                const header = {
                    headers: {
                        Authorization: "Bearer " + idToken,
                    },
                };
                const { data } = await axios.get(`http://localhost:4000/workspace/task/${id}/${taskID}`, header);
                console.log(data);
                setTask(data);
            } catch (e) {
                console.log(e);
            }
        }

        getTask();
    }, [])

    if (task) {
        prevTitle = task.title;
        prevDesc = task.description;
    }

    const handleClose = () => {
        setShow(false);
    };

    const updateTask = async () => {
        if (task) {
            try {
                let data = {};
                let title = document.getElementById("title").value.trim();
                if (title.length > 0) data.title = title;
                else data.title = task.title;
                let description = document.getElementById("description").value.trim();
                if (description.length > 0) data.description = description;
                else data.description = task.description;
                let startDate = document.getElementById("startDate").value.trim();
                if (startDate.length > 0) data.startDate = startDate;
                else data.startDate = task.startDate;
                let endDate = document.getElementById("endDate").value.trim();
                if (endDate.length > 0) data.endDate = endDate;
                else data.endDate = task.endDate;
                const idToken = await firebase.auth().currentUser.getIdToken();
                const header = {
                    headers: {
                        Authorization: "Bearer " + idToken,
                    },
                };
                const res = await axios.put(`http://localhost:4000/workspace/task/${id}/${taskID}`, data, header);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={prevTitle}
                            id="title"
                            name="title"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder={prevDesc}
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
                    <Button onClick={updateTask} variant="primary">
                        Update
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default EditTaskModel;
