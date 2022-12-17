import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import SocialSignIn from "./SocialSignIn";
import firebase from "firebase/compat/app";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const [validated, setValidated] = useState(false);
  const handleSignUp = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      const { email, passwordOne, passwordTwo } = e.target.elements;
      if (passwordOne.value !== passwordTwo.value) {
        setPwMatch("Passwords do not match");
        alert(pwMatch);
        return false;
      }

      try {
        await doCreateUserWithEmailAndPassword(email.value, passwordOne.value);
        let idToken = await firebase.auth().currentUser.getIdToken();

        // console.log(idToken);
        try {
          axios
            .post("http://localhost:4000/users/signup", null, {
              headers: {
                // "Content-Type": "application/json",
                Authorization: "Bearer " + idToken,
                // "Accept":"application/json"
              },
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              alert(error.message);
            });
        } catch (e) {
          alert(e.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-3">
        <Card.Title className="d-flex justify-content-center">
          SIGN UP
        </Card.Title>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSignUp}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Email
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordOne"
                  placeholder="Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom04">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordTwo"
                  placeholder="Confirm Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Sign UP</Button>
          </Form>
          <br />
          <SocialSignIn />
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
