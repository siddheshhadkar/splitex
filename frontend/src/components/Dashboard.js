import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import DashboardNavbar from "./DashboardNavbar";
import "../styles/dashboard.css";
import "../styles/you-owe-card.css";
import YouOweCard from "./Dashboard components/YouOweCard";
import YouAreOwedCard from "./Dashboard components/YouAreOwedCard";
import TransactionHistoryCard from "./Dashboard components/TransactionHistoryCard";
import FriendsCard from "./Dashboard components/FriendsCard";
import BalanceCard from "./Dashboard components/BalanceCard";

export default function Dashboard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <DashboardNavbar toggleLogInState={props.toggleLogInState} />
      <Container className="bg">
        <Row>
          <Col xs={12} md={8}>
            <h2 className="label">Payments</h2>
            <Button className="add-expense-btn" onClick={handleShow}>
              Add an expense
            </Button>
            <hr className="page-title-separator" />
          </Col>
          <Col xs={12} md={4}></Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <YouOweCard />
          </Col>
          <Col xs={12} md={4}>
            <YouAreOwedCard />
          </Col>
          <Col xs={12} md={4}>
            <BalanceCard />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8}>
            <h2 className="label">Transaction History</h2>
            <hr className="separator" />
          </Col>
          <Col xs={12} md={4}></Col>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <TransactionHistoryCard />
          </Col>

          <Col xs={12} md={4}>
            <br />
            <FriendsCard />
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#3B0A79" }}>Add an Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="friend_name" className="label-style">
            With you and:{" "}
          </label>
          <input type="text" name="friend_name" />
          <br />
          <label for="description" className="label-style">
            Description:{" "}
          </label>
          <input type="text" name="description" />
          <br />
          <label for="amount" style={{ margin: "5px" }}>
            Amount
          </label>
          <input type="text" name="amount" />
          <br />
          <label for="paid_by" style={{ margin: "5px" }}>
            Paid by
          </label>
          <input type="text" name="paid_by" />
          <br />
          <label for="split" style={{ margin: "5px" }}>
            Split
          </label>
          <br />
          <input type="radio" name="equally" />
          Equally &nbsp;
          <input type="radio" name="unequally" />
          Unequally
          <br />
          <label for="owner_amount" className="label-style">
            You{" "}
          </label>
          <input type="text" name="owner_amount" />
          <br />
          <label for="friend1_amount" className="label-style">
            Monali
          </label>
          <input type="text" name="friend1_amount" />
          <br />
          <label for="friend1_amount" style={{ margin: "5px" }}>
            Aarushi
          </label>
          <input type="text" name="friend2_amount" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
