import React, { useState } from "react";
import validator from "validator";
import swal from "sweetalert";
import "../styles/login.css";

import SignUpService from "../services/SignUpService";
import LandingNavbar from "./LandingNavbar";
import { Form, Button } from "react-bootstrap";

function Signup(props) {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const validateFields = (e) => {
    e.preventDefault();
    if (!validator.isEmail(emailValue)) {
      swal("Error", "Please enter valid email", "error");
    } else if (passwordValue.length < 8) {
      swal("Error", "Password should contain more than 8 characters", "error");
    } else if (validator.trim(nameValue).length <= 3) {
      swal("Error", "Name should contain more than 3 characters", "error");
    } else {
      signupUser();
    }
  };

  const signupUser = async () => {
    const data = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };

    try {
      let response = await SignUpService(data);
      if (response.success) {
        localStorage.setItem("token", response.data);
        props.toggleLogInState();
      } else {
        swal("Error", response.errorMessage, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LandingNavbar />
      <Form className="form">
        <div>
          <h3> Sign Up </h3>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email address"
            required
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button className="btnLogin" type="button" onClick={validateFields}>
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default Signup;
