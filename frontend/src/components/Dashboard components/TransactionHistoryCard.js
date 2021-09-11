import React from "react";
import { Card } from "react-bootstrap";
import "../../styles/transaction-history-card.css";
export default function TransactionHistoryCard() {
  let currentUserId = 101;
  const transactions = [
    {
      id: 1,
      description: "Pizza",
      totalAmount: 500,
      owner: {
        ownerId: 101,
        amount: 200,
      },
      friends: [
        {
          userId: 102,
          amount: 200,
          paymentStatus: true,
          settledDate: "2021-09-07T12:11:22.882+00:00",
        },
        {
          userId: 103,
          amount: 200,
          paymentStatus: false,
        },
      ],
      date: "2021-09-07T08:28:58.684+00:00",
    },
    {
      id: 2,
      description: "Lunch",
      totalAmount: 1500,
      owner: {
        ownerId: 102,
        amount: 500,
      },
      friends: [
        {
          userId: 103,
          amount: 600,
          paymentStatus: false,
        },
        {
          userId: 101,
          amount: 400,
          paymentStatus: true,
          settledDate: "2021-09-07T12:11:22.882+00:00",
        },
      ],
      date: "2021-09-07T08:28:58.684+00:00",
    },
  ];

  const renderCard = (card, index) => {
    let oId = card.owner.ownerId;

    if (currentUserId === oId) {
      card.friends.map((transaction, i) => {
        if (transaction.paymentStatus == true) {
          console.log("Reached here ", i);
          return (
            <Card
              style={{ width: "auto", height: "auto" }}
              className="card-style"
              key={index}
            >
              <Card.Body>
                <Card.Title className="transaction-card-body">
                  {transaction.userId} payed you Rs. {transaction.amount}
                </Card.Title>

                <div className="transaction-card-date">{transaction.date}</div>

                <br />
              </Card.Body>
            </Card>
          );
        }
      });
    }

    card.friends.map((transaction, i) => {
      if (
        currentUserId === transaction.userId &&
        transaction.paymentStatus == true
      ) {
        console.log("Reached here in settled friends transac ", i);
        return (
          <Card style={{ width: "auto", height: "auto" }} key={index}>
            <Card.Body>
              <Card.Title className="transaction-card-body">
                You payed {card.owner.ownerId} Rs. {transaction.amount}
              </Card.Title>
              <Card.Text>
                <div className="transaction-card-date">{transaction.date}</div>
              </Card.Text>
              <br />
            </Card.Body>
          </Card>
        );
      }
    });
  };
  return (
    <div>
      {transactions.length > 0 ? (
        <>{transactions.map(renderCard)}</>
      ) : (
        "No records to show"
      )}
      <br />
    </div>
  );
}
