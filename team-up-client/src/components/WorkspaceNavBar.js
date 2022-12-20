import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "../App.css";
function WorkspaceNavBar(props) {
  return (
    <Nav variant="tabs" defaultActiveKey={props.data.active}>
      <Nav.Item>
        <Nav.Link
          as={NavLink}
          eventKey="2"
          to={`/workspace/${props.data.id}/tasks`}
        >
          Tasks
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="3"
          as={NavLink}
          to={`/workspace/${props.data.id}/files`}
        >
          Files
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link
          as={NavLink}
          eventKey="4"
          to={`/workspace/${props.data.id}/meetings`}
        >
          Meetings
        </Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link eventKey="1" as={NavLink} to={`/workspace/${props.data.id}`}>
          Setting
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default WorkspaceNavBar;
