import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "../../styles/balance-card.css";
import "../../styles/you-owe-card.css";
export default function BalanceCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "auto", height: "auto" }}>
        <Card.Body>
          <Card.Title className="right-section-card-title">
            Your balance
          </Card.Title>
          <hr className="title-separator" />

          <Card.Text className="balance-div">Rs. 1000</Card.Text>
          <Button className="add-balance-btn" onClick={handleShow}>
            {" "}
            Add Balance
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#3B0A79" }}> Add Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="label-style">Amount: </label>
          <input type="text" name="amount" />
          <br />
          <label className="label-style">Choose payment option: </label>
          <br></br>
          <input type="radio" name="payMode" />
          <label for="payMode1" style={{ margin: "5px" }}>
            UPI/Wallet
          </label>
          <br></br>
          <input type="radio" name="payMode" />
          <label for="payMode2" style={{ margin: "5px" }}>
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
