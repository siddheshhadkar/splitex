import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import "../styles/landingNavbar.css";
import { NavLink } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="brandName" style={{ color: "#3B0A79" }}>
              SplitEx
            </Navbar.Brand>
          </NavLink>
        </Container>

        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Button className="btn"> Login </Button>
        </NavLink>

        <NavLink to="/signup" style={{ textDecoration: "none" }}>
          <Button className="btn" style={{ marginRight: 50 }}>
            SignUp
          </Button>
        </NavLink>
      </Navbar>
    </>
  );
}
