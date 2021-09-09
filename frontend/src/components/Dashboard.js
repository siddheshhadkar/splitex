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
          <div className="form-element">
            <label for="friend_name" className="label-style-add-expense">With you and: </label>
            <input type="text" name="friend_name" />

            <label for="description" className="label-style-add-expense">Description: </label>
            <input type="text" name="description" />

            <label for="amount" className="label-style-add-expense" style={{}}>
              Amount
            </label>
            <input type="text" name="amount" />

            <label for="paid_by" className="label-style-add-expense" style={{}}>
              Paid by
            </label>
            <input type="text" name="paid_by" />

            <label for="split" className="label-style-add-expense" style={{}}>
              Split
            </label>

            <input type="radio" name="split" className="split-input" />

            <span className="label-style-split" style={{}}>
              Equally
            </span>
            <input type="radio" name="split" className="split-input" />
            <span className="label-style-split" style={{}}>
              Unequally
            </span>
            <br />

            <label for="owner_amount" className="label-style-add-expense">You </label>
            <input type="text" name="owner_amount" />

            <label for="friend1_amount" className="label-style-add-expense">Monali</label>
            <input type="text" name="friend1_amount" />

            <label className="label-style-add-expense" for="friend1_amount" style={{}}>
              Aarushi
            </label>

            <input type="text" name="friend2_amount" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
