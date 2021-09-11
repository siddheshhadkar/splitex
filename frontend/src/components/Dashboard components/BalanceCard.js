import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import AddBalanceService from "./../../services/AddBalanceService";
import GetUserService from "./../../services/GetUserService";

import "../../styles/balance-card.css";
import "../../styles/you-owe-card.css";
export default function BalanceCard() {
  const [show, setShow] = useState(false);
  const [amountValue, setAmountValue] = useState(0);

  useEffect(() => {
    return async () => {
      const userData = await GetUserService(localStorage.getItem("token"));
      setAmountValue(userData.data.balance);
    };
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addBalance = async () => {
    const data = {
      amount: document.getElementById("amount").value,
    };
    console.log(data);
    try {
      let response = await AddBalanceService(data);
      console.log("response hello", response);
      if (response.success === true) {
        alert("Added Successfully!");
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

          <Card.Text className="balance-div">Rs.{amountValue} </Card.Text>
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
          <input type="text" name="amount" id="amount" />
          <br />
          <label className="label-style">Choose payment option: </label>
          <br></br>
          <input type="radio" name="payMode" checked />
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
          <Button onClick={addBalance}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
