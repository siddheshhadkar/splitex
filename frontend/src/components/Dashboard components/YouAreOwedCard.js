import React from "react";
import { Card } from "react-bootstrap";
import "../../styles/you-are-owed-card.css";
export default function YouAreOwedCard() {
  const areOwed = [
    {
      name: "Siddhesh",
      amount: "400",
    },

    {
      name: "Aarushi",
      amount: "200",
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Card
        style={{ width: "auto", height: "auto", marginBottom: "3%" }}
        className="card-style"
        key={index}
      >
        <Card.Body className="owed-card-text">
          {card.name}
          <div className="owed-card-amount">Rs. {card.amount}</div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Card
        style={{
          width: "auto",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        <Card.Body>
          <Card.Title className="card-title">You are owed</Card.Title>
          {areOwed.length > 0 ? (
            <>{areOwed.map(renderCard)}</>
          ) : (
            "No records to show"
          )}
        </Card.Body>
      </Card>
    </>
  );
}
