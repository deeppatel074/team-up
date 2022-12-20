import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkspaceNavBar from "./WorkspaceNavBar";
import firebase from "firebase/compat/app";
import "../App.css";
import axios from "axios";
import moment from "moment";
import { Form, Row, Col, Table, InputGroup, Button } from "react-bootstrap";
function Files() {
  const { id } = useParams();
  const [getFile, setFile] = useState(undefined);
  const [getInvited, setInvited] = useState(false);

  useEffect(() => {
    setInvited(false);
    const getMembersData = async (id) => {
      try {
        const idToken = await firebase.auth().currentUser.getIdToken();
        const header = {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        };
        const { data } = await axios.get(
          `http://localhost:4000/workspace/${id}/files`,
          header
        );
        setFile(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getMembersData(id);
  }, [id, getInvited]);

  const handleUpload = async (e) => {
    try {
      let file = document.getElementById("file").files[0];
      var formData = new FormData();
      formData.append("file", file);
      const idToken = await firebase.auth().currentUser.getIdToken();
      const header = {
        headers: {
          Authorization: "Bearer " + idToken,
          "content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/workspace/" + id + "/files",
        formData,
        header
      );

      setInvited(true);
    } catch (err) {
      console.log(err);
    }
  };

  let tableBody = undefined;
  const buildTable = (file) => {
    return (
      <tr>
        <td>
          <a href={file.fileUrl} download>
            {file.fileName}
          </a>
        </td>
        <td>{moment(file.uploadedDate).format("MMMM Do YYYY, h:mm:ss a")}</td>
      </tr>
    );
  };

  if (getFile) {
    tableBody = (
      <tbody>
        {getFile.map((el) => {
          return buildTable(el);
        })}
      </tbody>
    );
  }
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
              <Form.Control type="file" name="file" id="file" />

              <Button variant="dark" onClick={handleUpload} id="addButton">
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
              {tableBody}
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Files;
