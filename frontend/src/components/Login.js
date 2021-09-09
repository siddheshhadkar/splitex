import React, { useState } from "react";
import validator from "validator";
import LogInService from "../services/LogInService";

import "../styles/login.css";
import LandingNavbar from "./LandingNavbar";
import { Form, Button } from "react-bootstrap";

function Login(props) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const validateFields = (e) => {
    e.preventDefault();
    if (!validator.isEmail(emailValue)) {
      alert("Please enter valid email");
    } else if (passwordValue.length < 8) {
      alert("Password should contain more than 8 characters");
    } else {
      loginUser();
    }
  };

  const loginUser = async () => {
    const data = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      let response = await LogInService(data);
      if (response.success && response.data) {
        localStorage.setItem("token", response.data);
        props.toggleLogInState();
      } else {
        alert(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="center">
        <Form className="form">
          <div>
            <h3> Login </h3>
          </div>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email address"
              required
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button className="btnLogin" type="button" onClick={validateFields}>
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
