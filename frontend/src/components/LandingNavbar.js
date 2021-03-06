import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "../styles/landingNavbar.css";
import { NavLink } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <>
      <Navbar className="bg-purple">
        <Container>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="brandName" style={{ color: "#FFFFFF" }}>
              SplitEx
            </Navbar.Brand>
          </NavLink>
        </Container>

        <NavLink to="/login" className="btn-login">
          Login
        </NavLink>

        <NavLink to="/signup" className="btn-signup">
          SignUp
        </NavLink>
      </Navbar>
    </>
  );
}
