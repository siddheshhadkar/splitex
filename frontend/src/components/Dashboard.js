import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import GetUserService from "../services/GetUserService";

import "../styles/dashboard.css";
import "../styles/you-owe-card.css";

import "../services/AddExpenseService";
import DashboardNavbar from "./DashboardNavbar";
import YouOweCard from "./Dashboard components/YouOweCard";
import YouAreOwedCard from "./Dashboard components/YouAreOwedCard";
import TransactionHistoryCard from "./Dashboard components/TransactionHistoryCard";
import FriendsCard from "./Dashboard components/FriendsCard";
import BalanceCard from "./Dashboard components/BalanceCard";
import GetTransactionsService from "../services/GetTransactionsService";
import AddExpenseService from "../services/AddExpenseService";

export default function Dashboard(props) {
  const users = ["priyansh", "aarushi", "siddhesh", "monali"];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(null);
  const [ownerTransactions, setOwnerTransactions] = useState([]);
  const [owedTransactions, setOwedTransactions] = useState([]);
  const [historyTransactions, setHistoryTransactions] = useState([]);

  const [friend, setFriend] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [ownerAmount, setOwnerAmount] = useState("");
  const [friendAmount, setFriendAmount] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userData = await GetUserService();
      if (userData.success && userData.data) {
        setUserId(userData.data._id);
        setUserName(userData.data.name);
        setBalance(userData.data.balance);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const youAreOwedData = (transactions) => {
      const data = [];
      transactions.forEach((transaction) => {
        if (transaction.owner.ownerId === userId) {
          transaction.friends.forEach((friend) => {
            if (!friend.paymentStatus) {
              const obj = {
                userId: friend.userId,
                amount: friend.amount,
              };
              data.push(obj);
            }
          });
        }
      });
      setOwnerTransactions(data);
    };

    const youOweData = (transactions) => {
      const data = [];
      transactions.forEach((transaction) => {
        transaction.friends.forEach((friend) => {
          if (friend.userId === userId && !friend.paymentStatus) {
            const obj = {
              transactionId: transaction._id,
              ownerId: transaction.owner.ownerId,
              description: transaction.description,
              amount: friend.amount,
            };
            data.push(obj);
          }
        });
      });
      setOwedTransactions(data);
    };

    const historyData = (transactions) => {
      const data = [];
      transactions.forEach((transaction) => {
        transaction.friends.forEach((friend) => {
          if (friend.paymentStatus) {
            const obj = {
              ownerId: transaction.owner.ownerId,
              userId: friend.userId,
              amount: friend.amount,
              settledData: friend.settledDate,
            };
            data.push(obj);
          }
        });
      });
      setHistoryTransactions(data);
    };

    const getTransactions = async () => {
      const transactionData = await GetTransactionsService();
      if (transactionData.success && transactionData.data) {
        const allTransactions = transactionData.data;
        youAreOwedData(allTransactions);
        youOweData(allTransactions);
        historyData(allTransactions);
      }
    };
    getTransactions();
  }, [userId]);

  const addExpense = async () => {
    const data = {
      description: description,
      totalAmount: amount,
      owner: {
        amount: ownerAmount,
      },
      friends: [
        {
          userId: friend,
          amount: friendAmount,
        },
      ],
    };

    try {
      let response = await AddExpenseService(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <>
      <DashboardNavbar
        toggleLogInState={props.toggleLogInState}
        userName={userName}
      />
      <Container className="bg">
        <Row>
          <Col xs={12} md={8}>
            <h2 className="label">Payments</h2>
            <Button
              className="add-expense-btn"
              style={{ width: "max-content" }}
              onClick={handleShow}
            >
              Add an expense
            </Button>
            <hr className="page-title-separator" />
          </Col>
          <Col xs={12} md={4}></Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <YouOweCard transactions={owedTransactions} />
          </Col>
          <Col xs={12} md={4}>
            <YouAreOwedCard transactions={ownerTransactions} />
          </Col>
          <Col xs={12} md={4}>
            <BalanceCard balance={balance} />
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
            <TransactionHistoryCard transactions={historyTransactions} />
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
            <label for="friend_name" className="label-style-add-expense">
              With you and: <select></select>
            </label>
            <input
              type="text"
              name="friend_name"
              onChange={(e) => setFriend(e.target.value)}
            />

            <label for="description" className="label-style-add-expense">
              Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <label for="amount" className="label-style-add-expense" style={{}}>
              Amount
            </label>
            <input
              type="text"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
            />

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

            <label for="owner_amount" className="label-style-add-expense">
              You{" "}
            </label>
            <input
              type="text"
              name="owner_amount"
              onChange={(e) => setOwnerAmount(e.target.value)}
            />

            <label for="friend1_amount" className="label-style-add-expense">
              Monali
            </label>
            <input
              type="text"
              name="friend1_amount"
              onChange={(e) => setFriendAmount(e.target.value)}
            />

            <label
              className="label-style-add-expense"
              for="friend1_amount"
              style={{}}
            >
              Aarushi
            </label>

            <input type="text" name="friend2_amount" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addExpense}>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
