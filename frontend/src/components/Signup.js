import React from "react";
import LandingNavbar from "./LandingNavbar";
import "../styles/login.css";
import { Form, Button } from "react-bootstrap";

function Signup() {
  return (
    <>
      <LandingNavbar />
      <Form className="form">
        <div>
          <h3> Sign Up </h3>
        </div>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label style={{ color: "white" }}>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter your name"
            required
          />
        </Form.Group>

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
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button className="btnLogin" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default Signup;
