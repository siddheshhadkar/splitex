import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "../../styles/you-owe-card.css";
export default function YouOweCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "auto", height: "auto" }}>
        <Card.Body>
          <Card.Title className="card-title">You owe</Card.Title>
          <Card style={{ width: "auto", height: "auto" }}>
            <Card.Body>
              <Card.Text className="owe-card-text">
                <strong> Monali </strong> <br />
                Lunch <br />
                Rs. 400
                <div className="pay-button-div">
                  <button className="pay-button" onClick={handleShow}>
                    Pay
                  </button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card style={{ width: "auto", height: "auto" }}>
            <Card.Body>
              <Card.Text className="owe-card-text">
                <strong> Aarushi </strong> <br />
                Dinner <br />
                Rs. 500
                <div className="pay-button-div">
                  <button className="pay-button">Pay</button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card style={{ width: "auto", height: "auto" }}>
            <Card.Body>
              <Card.Text className="owe-card-text">
                <strong> Monali </strong> <br />
                Groceries <br />
                Rs. 200
                <div className="pay-button-div">
                  <button className="pay-button">Pay</button>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settle Bills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Paying to: </label>
          <input type="text" name="payingTo" />
          <br />
          <label>Amount: </label>
          <input type="text" name="amount" />
          <br />
          <label>Choose payment option: </label>
          <br></br>
          <input type="radio" name="payMode1" /> 
          <label for="payMode1">UPI/Wallet</label>
          <br></br>
          <input type="radio" name="payMode2" /> 
          <label for="payMode2">Credit Card/ Debit Card</label>
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
