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

function Tasks() {
  const { id } = useParams();
  const [taskList, setTaskList] = useState(undefined);
  let allTasks, myTask, completedTask, activeTask;

  useEffect(() => {
    const getTask = async () => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.get(
          `http://localhost:4000/workspace/${id}/tasks`,
          header
        );
        setTaskList(data);
      } catch (e) {
        console.log(e);
      }
    };

    getTask();
  }, []);

  const completeTask = async (taskData) => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const header = {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      };
      let dataa = {
        id: id,
        taskId: taskData._id,
        isCompleted: false
      };
      if (taskData.status === 2) dataa.isCompleted = true;
      await axios.patch(`http://localhost:4000/workspace/task/${id}/${taskData._id}`, dataa, header);
      const { data } = await axios.get(
        `http://localhost:4000/workspace/${id}/tasks`,
        header
      );
      setTaskList(data);
    } catch (e) {
      console.log(e);
    }
  }

  let eventKey = -1;
  const createTask = (taskData) => {
    let returnData = taskData.map((d) => {
      let taskName = d.title;
      let taskDesc = d.description;
      let startDate = d.startDate.substr(0, 10);
      let endDate = d.endDate.substr(0, 10);
      let createdName = d.createdBy[0].name;
      let complete = <Button variant="success" onClick={() => completeTask(d)}>Mark As Completed</Button>;
      if (d.status !== 2) {
        complete = <Button variant="danger" onClick={() => completeTask(d)}>Mark As Incomplete</Button>;
      }
      eventKey += 1;
      return (
        <div className="mt-2" key={d._id}>
          <Accordion>
            <Accordion.Item eventKey={eventKey}>
              <Accordion.Header>{taskName}</Accordion.Header>
              <Accordion.Body>{taskDesc}</Accordion.Body>
              <Accordion.Body>
                Start Date: {startDate} || End Date: {endDate}
                <br />
                Created By: {createdName}
              </Accordion.Body>
              <Accordion.Body>
                <Link to={`/workspace/${id}/tasks/edit/${d._id}`}>
                  <Button variant="secondary">Edit</Button>{" "}
                </Link>
                {complete}{" "}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    });
    return returnData;
  }

  if (taskList) {
    allTasks = createTask(taskList.allTask);
    myTask = createTask(taskList.myTask);
    completedTask = createTask(taskList.completedTask);
    activeTask = createTask(taskList.activeTask);
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
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#AllTask">{allTasks}</Tab.Pane>
                <Tab.Pane eventKey="#ActiveTask">{activeTask}</Tab.Pane>
                <Tab.Pane eventKey="#MyTask">{myTask}</Tab.Pane>
                <Tab.Pane eventKey="#CompletedTask">{completedTask}</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <div>
        <Link to={`/workspace/${id}/tasks/create`}>
          <Button
            variant="dark"
            style={{
              position: "fixed",
              bottom: "12px",
              left: "10px",
              borderRadius: "20PX",
            }}
          >
            Create New Task
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Tasks;
