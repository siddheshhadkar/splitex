import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "../../styles/you-owe-card.css";
export default function YouOweCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const youOwe = [
    {
      name: "Monali",
      description: "Lunch",
      amount: "300",
    },
    {
      name: "Priyansh",
      description: "Dinner",
      amount: "500",
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Card
        style={{ width: "auto", height: "auto", marginBottom: "3%" }}
        className="card-style"
        key={index}
      >
        <Card.Body className="owe-card-text">
          <strong> {card.name} </strong> <br />
          {card.description} <br />
          Rs. {card.amount}
          <div className="pay-button-div">
            <button className="pay-button" onClick={handleShow}>
              Pay
            </button>
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
          {youOwe.length > 0 ? (
            <>{youOwe.map(renderCard)}</>
          ) : (
            "No records to show"
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#3B0A79" }}>Settle Bills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="label-style">Paying to: </label>
          <input type="text" name="payingTo" />
          <br />
          <label className="label-style">Amount: </label>
          <input type="text" name="amount" />
          <br />
          <label className="label-style">Choose payment option: </label>
          <br></br>
          <input type="radio" name="payMode" /> 
          <label for="payMode1" style={{ margin: "10px" }}>
            UPI/Wallet
          </label>
          <br></br>
          <input type="radio" name="payMode" /> 
          <label for="payMode2" style={{ margin: "10px" }}>
            Credit Card/ Debit Card
          </label>
          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
