import React from "react";
import { Button, Card } from "react-bootstrap";
import "../../styles/balance-card.css";
export default function BalanceCard() {
  return (
    <>
      <Card style={{ width: "20rem", height: "20rem", marginLeft: "20%" }}>
        <Card.Body>
          <Card.Title className="right-section-card-title">
            Your balance
          </Card.Title>
          <hr className="title-separator" />

          <Card.Text className="balance-div">Rs. 1000</Card.Text>
          <Button className="add-balance-btn"> Add Balance</Button>
        </Card.Body>
      </Card>
    </>
  );
}
