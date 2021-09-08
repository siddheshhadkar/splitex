import React from "react";
import LandingNavbar from "./LandingNavbar";
import "../styles/login.css";
import { Form, Button } from "react-bootstrap";

function Login() {
  return (
    <>
      <LandingNavbar />
      <div className="center">
        <Form className="form">
          <div>
            <h3> Login </h3>
          </div>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label style={{ color: "white" }}>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button className="btnLogin" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
