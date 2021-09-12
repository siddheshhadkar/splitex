import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import AddBalanceService from "./../../services/AddBalanceService";

import "../../styles/balance-card.css";
import "../../styles/you-owe-card.css";
export default function BalanceCard(props) {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(props.balance);
  const [amountInput, setAmountInput] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAmountInput = (e) => {
    setAmountInput(e.target.value);
  };

  useEffect(() => {
    setAmount(props.balance);
  }, [props.balance]);

  const addBalance = async () => {
    const data = {
      amount: amountInput,
    };
    try {
      let response = await AddBalanceService(data);
      if (response.success === true) {
        alert("Added Successfully!");
        setAmount(response.data);
        setShow(false);
      } else {
        alert(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card style={{ width: "auto", height: "auto" }}>
        <Card.Body>
          <Card.Title className="right-section-card-title">
            Your balance
          </Card.Title>
          <hr className="title-separator" />

          <Card.Text className="balance-div">Rs. {amount} </Card.Text>
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
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={handleAmountInput}
          />
          <br />
          <label className="label-style">Choose payment option: </label>
          <br></br>
          <input type="radio" name="payMode" checked readOnly />
          <label htmlFor="payMode1" style={{ margin: "5px" }}>
            UPI/Wallet
          </label>
          <br></br>
          <input type="radio" name="payMode" />
          <label htmlFor="payMode2" style={{ margin: "5px" }}>
            Credit Card/ Debit Card
          </label>
          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addBalance}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
