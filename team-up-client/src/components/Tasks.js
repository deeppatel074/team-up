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
  let allTasks, myTask, completedTask, activeTask;
  // const [getDate, setDate] = useState(false);

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
  const handleComplete = async () => {
    // try {
    //   const idToken = await firebase.auth().currentUser.getIdToken();
    //   const header = {
    //     headers: {
    //       Authorization: "Bearer " + idToken,
    //     },
    //   };
    //   const { data } = await axios.patch(
    //     `http://localhost:4000/workspace/task/${id}/${taskId}`,
    //     {
    //       isCompleted: true,
    //     },
    //     header
    //   );
    //   if (data) {
    //     // setDate(true);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const handleInComplete = async () => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken();
      const header = {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      };
      const { data } = await axios.patch(
        `http://localhost:4000/workspace/task/${id}/`,
        {
          isCompleted: false,
        },
        header
      );
      if (data) {
        // setDate(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (taskList) {
    let eventKey = -1;
    allTasks = taskList.allTask.map((d) => {
      let taskName = d.title;
      let taskDesc = d.description;
      let startDate = d.startDate.substr(0, 10);
      let endDate = d.endDate.substr(0, 10);
      let createdName = d.createdBy[0].name;
      let status = d.status;
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
                {status === 2 ? (
                  <Button variant="success" onClick={handleComplete}>
                    Mark As Completed
                  </Button>
                ) : (
                  <Button variant="danger" onClick={handleInComplete}>
                    Mark As InCompleted
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    });

    myTask = taskList.myTask.map((d) => {
      let taskName = d.title;
      let taskDesc = d.description;
      let startDate = d.startDate.substr(0, 10);
      let endDate = d.endDate.substr(0, 10);
      let createdName = d.createdBy[0].name;
      let status = d.status;
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
                {status === 2 ? (
                  <Button variant="success" onClick={handleComplete}>
                    Mark As Completed
                  </Button>
                ) : (
                  <Button variant="danger" onClick={handleInComplete}>
                    Mark As InCompleted
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    });

    completedTask = taskList.completedTask.map((d) => {
      let taskName = d.title;
      let taskDesc = d.description;
      let startDate = d.startDate.substr(0, 10);
      let endDate = d.endDate.substr(0, 10);
      let createdName = d.createdBy[0].name;
      let status = d.status;
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
                {status === 2 ? (
                  <Button variant="success" onClick={handleComplete}>
                    Mark As Completed
                  </Button>
                ) : (
                  <Button variant="danger" onClick={handleInComplete}>
                    Mark As InCompleted
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    });

    activeTask = taskList.activeTask.map((d) => {
      let taskName = d.title;
      let taskDesc = d.description;
      let startDate = d.startDate.substr(0, 10);
      let endDate = d.endDate.substr(0, 10);
      let createdName = d.createdBy[0].name;
      let status = d.status;
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
                  <Button variant="secondary">Edit</Button>
                </Link>
                {status === 2 ? (
                  <Button variant="success" onClick={handleComplete}>
                    Mark As Completed
                  </Button>
                ) : (
                  <Button variant="danger" onClick={handleInComplete}>
                    Mark As InCompleted
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    });
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
              bottom: "70px",
              left: "10px",
              borderRadius: "20PX",
            }}
          >
            Schedule Meeting
          </Button>
        </Link>
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
