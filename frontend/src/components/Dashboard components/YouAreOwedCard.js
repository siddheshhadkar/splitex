import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../../styles/you-are-owed-card.css";
export default function YouAreOwedCard(props) {
  const [transactions, setTransactions] = useState(props.transactions);

  useEffect(() => {
    setTransactions(props.transactions);
  }, [props.transactions]);

  const renderCard = (card, index) => {
    return (
      <Card
        style={{ width: "auto", height: "auto", marginBottom: "3%" }}
        className="card-style"
        key={index}
      >
        <Card.Body className="owed-card-text">
          <p>
            <strong>{card.name}</strong>
          </p>
          {card.description}
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
          {transactions.length > 0 ? (
            <>{transactions.map(renderCard)}</>
          ) : (
            "No records to show"
          )}
        </Card.Body>
      </Card>
    </>
  );
}
