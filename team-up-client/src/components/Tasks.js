import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import WorkspaceNavBar from "./WorkspaceNavBar";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import firebase from "firebase/compat/app";
import Cookies from "js-cookie";

function Tasks() {
  const { id } = useParams();
  const userID = Cookies.get("user");
  const [taskList, setTaskList] = useState(undefined);
  let tasks;

  useEffect(() => {
    const getTask = async () => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.get(`http://localhost:4000/workspace/${id}/tasks`, header);
        setTaskList(data);
      } catch (e) {
        console.log(e);
      }
    }

    getTask();
  }, [])


  const updateTask = async () => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const header = {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      };
      let data = {};
      const res = await axios.put(`http://localhost:4000/workspace/task/${userID}/${id}`, data, header);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  if (taskList) {
    let eventKey = -1;
    tasks = taskList.allTask.map((d) => {
      let taskName = d.title;
      let taskDesc = d.description;
      let startDate = d.startDate.substr(0, 10);
      let endDate = d.endDate.substr(0, 10);
      eventKey += 1;
      return (
        <div className="mt-2" key={d._id}>
          <Accordion>
            <Accordion.Item eventKey={eventKey}>
              <Accordion.Header>{taskName}</Accordion.Header>
              <Accordion.Body>
                {taskDesc}
              </Accordion.Body>
              <Accordion.Body>
                Start Date: {startDate} || End Date: {endDate}
              </Accordion.Body>
              <Accordion.Body>
                <Link to={`/workspace/${id}/tasks/edit/${d._id}`}>
                  <Button variant="secondary">Edit</Button>{" "}
                </Link>
                <Button variant="success">Mark As Completed</Button>{" "}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )
    })
  }

  return (
    <div>
      <WorkspaceNavBar data={{ id: id, active: `2` }} />
      <div className="mt-4">
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="#ActiveTask"
        >
          <Row>
            <Col sm={3}>
              <ListGroup>
                <ListGroup.Item action href="#AllTask">
                  All Task
                </ListGroup.Item>
                <ListGroup.Item action href="#ActiveTask">
                  Active Task
                </ListGroup.Item>
                <ListGroup.Item action href="#MyTask">
                  My Task
                </ListGroup.Item>
                <ListGroup.Item action href="#CompletedTask">
                  Completed Task
                </ListGroup.Item>
              </ListGroup>
              <div style={{ marginTop: "20px" }}>
                <Link to={`/workspace/${id}/tasks/create`}>
                  <Button variant="dark">Create New Task</Button>
                </Link>
              </div>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#AllTask">{tasks}</Tab.Pane>
                <Tab.Pane eventKey="#ActiveTask">{tasks}</Tab.Pane>
                <Tab.Pane eventKey="#MyTask">{tasks}</Tab.Pane>
                <Tab.Pane eventKey="#CompletedTask">{tasks}</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      {/* <div className="row">
        <div className="col">
          <Card
            className="text-center card"
            style={{ width: "13rem", height: "13rem", marginTop: "20px" }}
          >
            <Card.Body style={{ marginTop: "50px" }}>
              <Card.Title>Sort Task</Card.Title>
              <Form>
                <Form.Select aria-label="Sort">
                  <option value="1">Complete</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col"></div>
      </div> */}
    </div>
  );
}

export default Tasks;
