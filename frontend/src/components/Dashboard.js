import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import swal from "sweetalert";
import GetUserService from "../services/GetUserService";
import GetUsersService from "../services/GetUsersService";
import GetTransactionsService from "../services/GetTransactionsService";
import AddExpenseService from "../services/AddExpenseService";

import "../styles/dashboard.css";
import "../styles/you-owe-card.css";

import "../services/AddExpenseService";
import DashboardNavbar from "./DashboardNavbar";
import YouOweCard from "./Dashboard components/YouOweCard";
import YouAreOwedCard from "./Dashboard components/YouAreOwedCard";
import TransactionHistoryCard from "./Dashboard components/TransactionHistoryCard";
import FriendsCard from "./Dashboard components/FriendsCard";
import BalanceCard from "./Dashboard components/BalanceCard";

export default function Dashboard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(null);
  const [ownerTransactions, setOwnerTransactions] = useState([]);
  const [owedTransactions, setOwedTransactions] = useState([]);
  const [historyTransactions, setHistoryTransactions] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [ownerAmount, setOwnerAmount] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userData = await GetUserService();
      if (userData.success && userData.data) {
        setUserId(userData.data._id);
        setUserName(userData.data.name);
        setBalance(userData.data.balance);
      }
    };

    const getUsers = async () => {
      const usersData = await GetUsersService();
      if (usersData.success && usersData.data) {
        setUsers(usersData.data);
        setFriends(usersData.data);
      }
    };

    getUser();
    getUsers();
  }, []);

  useEffect(() => {
    if (userId !== "" && users.length !== 0) {
      const youAreOwedData = (transactions) => {
        const data = [];
        transactions.forEach((transaction) => {
          if (transaction.owner.ownerId === userId) {
            transaction.friends.forEach((friend) => {
              if (!friend.paymentStatus) {
                let nameFriend;
                users.forEach((user) => {
                  if (user._id === friend.userId) nameFriend = user.name;
                });
                const obj = {
                  friendId: friend.userId,
                  name: nameFriend,
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
              let nameOwner;
              users.forEach((user) => {
                if (user._id === transaction.owner.ownerId)
                  nameOwner = user.name;
              });
              const obj = {
                transactionId: transaction._id,
                ownerId: transaction.owner.ownerId,
                name: nameOwner,
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
          if (transaction.owner.ownerId === userId) {
            transaction.friends.forEach((friend) => {
              if (friend.paymentStatus) {
                let nameFriend;
                users.forEach((user) => {
                  if (user._id === friend.userId) nameFriend = user.name;
                });
                const obj = {
                  userId: userId,
                  ownerId: transaction.owner.ownerId,
                  friendId: friend.userId,
                  nameOwner: null,
                  nameFriend: nameFriend,
                  amount: friend.amount,
                  settledDate: friend.settledDate,
                };
                data.push(obj);
              }
            });
          } else {
            transaction.friends.forEach((friend) => {
              if (friend.userId === userId && friend.paymentStatus) {
                let nameOwner;
                users.forEach((user) => {
                  if (user._id === transaction.owner.ownerId)
                    nameOwner = user.name;
                });
                const obj = {
                  userId: userId,
                  ownerId: transaction.owner.ownerId,
                  friendId: friend.userId,
                  nameOwner: nameOwner,
                  nameFriend: null,
                  amount: friend.amount,
                  settledDate: friend.settledDate,
                };
                data.push(obj);
              }
            });
          }
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
    }
  }, [userId, users]);

  const addExpense = async () => {
    const data = {
      description: description,
      totalAmount: amount,
      owner: {
        amount: ownerAmount,
      },
      friends: [],
    };

    selectedFriends.forEach((id, index) => {
      if (id !== null && selectedFriendsAmount[index] !== null) {
        const obj = {
          userId: id,
          amount: selectedFriendsAmount[index],
        };
        data.friends.push(obj);
      }
    });
    if (
      data.friends.length === 0 ||
      data.description === "" ||
      data.owner.amount === "" ||
      data.totalAmount === ""
    ) {
      alert("Please enter valid details");
    } else {
      console.log(data);
      try {
        let response = await AddExpenseService(data);
        if (response.success) {
          swal("Expense Added", "", "success").then(() => {
            setShow(false);
            window.location.reload();
          });
        } else {
          swal(
            "Error",
            response.errorMessage === undefined
              ? "Please enter valid details"
              : response.errorMessage,
            "error"
          );
        }
      } catch (error) {
        console.log(error);
        setShow(false);
      }
    }
  };

  const selectedFriends = [null, null, null];

  const handleSelectFriend1 = (e) => {
    if (e.target.value === "default") {
      selectedFriends[0] = null;
    } else {
      if (
        selectedFriends[1] === e.target.value ||
        selectedFriends[2] === e.target.value
      ) {
        swal("Error", "You have already selected this user", "error");
      } else {
        selectedFriends[0] = e.target.value;
      }
    }
  };

  const handleSelectFriend2 = (e) => {
    if (e.target.value === "default") {
      selectedFriends[1] = null;
    } else {
      if (
        selectedFriends[0] === e.target.value ||
        selectedFriends[2] === e.target.value
      ) {
        swal("Error", "You have already selected this user", "error");
      } else {
        selectedFriends[1] = e.target.value;
      }
    }
  };

  const handleSelectFriend3 = (e) => {
    if (e.target.value === "default") {
      selectedFriends[2] = null;
    } else {
      if (
        selectedFriends[1] === e.target.value ||
        selectedFriends[0] === e.target.value
      ) {
        swal("Error", "You have already selected this user", "error");
      } else {
        selectedFriends[2] = e.target.value;
      }
    }
  };

  const selectedFriendsAmount = [null, null, null];

  const handleFriend1Amount = (e) => {
    if (e.target.value === "") {
      selectedFriendsAmount[0] = null;
    } else {
      selectedFriendsAmount[0] = e.target.value;
    }
  };

  const handleFriend2Amount = (e) => {
    if (e.target.value === "") {
      selectedFriendsAmount[1] = null;
    } else {
      selectedFriendsAmount[1] = e.target.value;
    }
  };

  const handleFriend3Amount = (e) => {
    if (e.target.value === "") {
      selectedFriendsAmount[2] = null;
    } else {
      selectedFriendsAmount[2] = e.target.value;
    }
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
            <label htmlFor="description" className="label-style-add-expense">
              Description:{" "}
            </label>
            <input
              style={{ minWidth: "100%", maxWidth: "100%" }}
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label
              htmlFor="amount"
              className="label-style-add-expense"
              style={{}}
            >
              Total Amount
            </label>
            <input
              style={{ minWidth: "100%", maxWidth: "100%" }}
              type="text"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="owner_amount" className="label-style-add-expense">
              You{" "}
            </label>
            <input
              style={{ minWidth: "100%", maxWidth: "100%" }}
              type="text"
              name="owner_amount"
              onChange={(e) => setOwnerAmount(e.target.value)}
            />
            <Row>
              <Col xs={12} md={8}>
                <label className="label-style-add-expense">Split with </label>
              </Col>
              <Col xs={12} md={4}>
                <label className="label-style-add-expense">Amount</label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={8}>
                <Form.Select
                  size="sm"
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  onChange={handleSelectFriend1}
                >
                  <option value="default">Select Friend</option>
                  {friends.length === 0
                    ? null
                    : friends.map((friend) => {
                        return (
                          <option key={friend._id} value={friend._id}>
                            {friend.name}
                          </option>
                        );
                      })}
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <input
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  type="text"
                  name="friend1Amount"
                  onChange={handleFriend1Amount}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={8}>
                <Form.Select
                  size="sm"
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  onChange={handleSelectFriend2}
                >
                  <option value={null}>Select Friend</option>
                  {friends.length === 0
                    ? null
                    : friends.map((friend) => {
                        return (
                          <option key={friend._id} value={friend._id}>
                            {friend.name}
                          </option>
                        );
                      })}
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <input
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  type="text"
                  name="friend2Amount"
                  onChange={handleFriend2Amount}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={8}>
                <Form.Select
                  size="sm"
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  onChange={handleSelectFriend3}
                >
                  <option value={null}>Select Friend</option>
                  {friends.length === 0
                    ? null
                    : friends.map((friend) => {
                        return (
                          <option key={friend._id} value={friend._id}>
                            {friend.name}
                          </option>
                        );
                      })}
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <input
                  style={{ minWidth: "100%", maxWidth: "100%" }}
                  type="text"
                  name="friend3Amount"
                  onChange={handleFriend3Amount}
                />
              </Col>
            </Row>
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
