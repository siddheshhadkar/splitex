import React from "react";
import { Card } from "react-bootstrap";
import "../../styles/you-are-owed-card.css";
export default function YouAreOwedCard() {
  return (
    <>
      <Card style={{ width: "auto", height: "auto" }}>
        <Card.Body>
          <Card.Title className="card-title">You are owed</Card.Title>
          <Card style={{ width: "auto", height: "auto" }}>
            <Card.Body>
              <Card.Text className="owed-card-text">
                Siddhesh
                <div className="owed-card-amount">Rs. 400</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card style={{ width: "auto", height: "auto" }}>
            <Card.Body>
              <Card.Text className="owed-card-text">
                Priyansh
                <div className="owed-card-amount">Rs. 400</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </Card.Body>
      </Card>
    </>
  );
}
