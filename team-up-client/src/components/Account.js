import React from "react";
import "../App.css";
import ChangePassword from "./ChangePassword";
import { Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
function Account() {
  const name = Cookies.get("userName");
  return (
    <div>
      <div className="row text-center mt-4">
        <h1 className="h3">Welcome, {name}</h1>
      </div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <ChangePassword />
        </Col>
      </Row>
    </div>
  );
}

export default Account;
