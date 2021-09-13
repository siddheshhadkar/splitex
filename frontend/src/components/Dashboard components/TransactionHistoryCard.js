import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../../styles/transaction-history-card.css";
export default function TransactionHistoryCard(props) {
  const [transactions, setTransactions] = useState(props.transactions);

  useEffect(() => {
    setTransactions(props.transactions);
  }, [props.transactions]);

  const renderCard = (card, index) => {
    return (
      <Card
        style={{
          width: "auto",
          height: "auto",
          marginBottom: "3%",
        }}
        className="card-style"
        key={index}
      >
        <Card.Body>
          <Card.Title className="transaction-card-body">
            {card.ownerId === card.userId ? (
              <>
                {card.nameFriend} paid you Rs.{card.amount}
              </>
            ) : (
              <>
                You paid {card.nameOwner} Rs.{card.amount}
              </>
            )}
          </Card.Title>

          <div className="transaction-card-date">
            {card.settledDate !== undefined ? (
              new Date(card.settledDate).toLocaleString()
            ) : (
              <></>
            )}
          </div>
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
          <Card.Title className="card-title">You owe</Card.Title>
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
