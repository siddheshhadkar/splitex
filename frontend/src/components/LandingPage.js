import React from "react";
import LandingNavbar from "./LandingNavbar";
import "../styles/landingPage.css";
import heroImage from "../assets/heroImage.svg";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <Container fluid="md">
        <Row className="gx-4">
          <Col xs={12} sm={6} className="my-auto">
            <div>
              <h1>
                Relieve yourself from the hassle of remembering bills shared!
              </h1>
              <br />
              <div>
                <p className="lead">
                  Introducing SplitEx, a complete <br /> solution for all your
                  bill splitting needs!
                </p>
              </div>
              <Link to="/signup">
                <Button className="bg-purple">Create a free account!!</Button>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={6} className="my-auto">
            <Image src={heroImage} alt="SVG" fluid />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
