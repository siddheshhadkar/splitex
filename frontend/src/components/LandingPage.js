import React from "react";
import LandingNavbar from "./LandingNavbar";
import "../styles/landingPage.css";
import heroImage from "../assets/heroImage.svg";
import { Col, Container, Image, Row } from "react-bootstrap";

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
