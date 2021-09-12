import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import SettleBillService from "../../services/SettleBillService";
import "../../styles/you-owe-card.css";

export default function YouOweCard(props) {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState(props.transactions);
  const [currentCard, setCurrentCard] = useState({});

  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    setCurrentCard(transactions[e.target.id]);
    setShow(true);
  };

  const handlePayment = async () => {
    const data = {
      transactionId: currentCard.transactionId,
    };
    try {
      const response = await SettleBillService(data);
      if (response.success) {
        alert("Bill settled");
        window.location.reload();
      } else {
        alert(response.errorMessage);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setShow(false);
    }
  };

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
        <Card.Body className="owe-card-text">
          <strong> {card.name} </strong> <br />
          {card.description} <br />
          Rs. {card.amount}
          <div className="pay-button-div">
            <button className="pay-button" onClick={handleShow} id={index}>
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
          {transactions.length > 0 ? (
            <>{transactions.map(renderCard)}</>
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
          <label className="label-style">Paying to: {currentCard.name}</label>
          <br />
          <label className="label-style">
            Description: {currentCard.description}
          </label>
          <br />
          <label className="label-style">Amount: {currentCard.amount}</label>
          <br />
          <label className="label-style">Choose payment option: </label>
          <br></br>
          <input type="radio" name="payMode" /> 
          <label htmlFor="payMode1" style={{ margin: "10px" }}>
            UPI/Wallet
          </label>
          <br></br>
          <input type="radio" name="payMode" /> 
          <label htmlFor="payMode2" style={{ margin: "10px" }}>
            Credit Card/ Debit Card
          </label>
          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handlePayment}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
