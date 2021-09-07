import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import '../styles/landingNavbar.css';

export default function LandingNavbar() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand
            href=""
            className="brandName"
            style={{ color: "#3B0A79" }}
          >
            {" "}
            SplitEx{" "}
          </Navbar.Brand>
        </Container>

        <Button href="#" className="btn">
          {" "}
          Login{" "}
        </Button>

        <Button href="#" className="btn" style={{ marginRight: 50 }}>
          {" "}
          SignUp{" "}
        </Button>
      </Navbar>
    </>
  );
}
