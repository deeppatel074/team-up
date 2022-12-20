import React from "react";
import { useParams } from "react-router-dom";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { Form, Row, Col, Table, InputGroup, Button } from "react-bootstrap";
function Files() {
  const { id } = useParams();
  return (
    <div>
      <WorkspaceNavBar data={{ id: id, active: `3` }} />
      <div className="row text-center mt-4">
        <h1 className="h3">Files</h1>
      </div>
      <div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <InputGroup className="mb-3">
              <Form.Control type="file" />

              <Button variant="dark" id="addButton">
                Upload
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Table striped>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Uploaded Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Files;
