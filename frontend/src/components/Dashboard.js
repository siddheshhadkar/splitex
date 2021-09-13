import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
import GetUserService from "../services/GetUserService";
import GetAllUsersService from "../services/GetAllUsersService";
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

var response = {};

export default function Dashboard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(null);
  const [friendsNameArray, setFriendsNameArray] = useState([]);
  const [friendsOption, setFriendsOption] = useState([]);
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
    const getFriends = async () => {
      response = await GetAllUsersService();

      let friendsName = ["Select Friend"];
      for (let i = 0; i < response.length; i++) {
        friendsName.push(response[i]["name"]);
      }
      setFriendsNameArray((friendsNameArray) => [...friendsName, friendsName]);
      let friendsList = Object.keys(friendsName).map((k) => {
        return (
          <option key={k} value={friendsName[k]}>
            {friendsName[k]}
          </option>
        );
      }, this);

      setFriendsOption((friendsOption) => [...friendsOption, friendsList]);
    };
    getUser();
    getFriends();
  }, []);

  const [friend1, setFriend1] = useState("");
  const [friend2, setFriend2] = useState("");
  const [friend3, setFriend3] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [ownerAmount, setOwnerAmount] = useState("");
  const [friend1Amount, setFriend1Amount] = useState("");
  const [friend2Amount, setFriend2Amount] = useState("");
  const [friend3Amount, setFriend3Amount] = useState("");

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
      friends: [
        {
          userId: response.filter((friend) => friend.name == friend1)[0]["_id"],
          amount: friend1Amount,
        },
        {
          userId: response.filter((friend) => friend.name == friend2)[0]["_id"],
          amount: friend2Amount,
        },
        {
          userId: response.filter((friend) => friend.name == friend3)[0]["_id"],
          amount: friend3Amount,
        },
      ],
    };

    try {
      let response = await AddExpenseService(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    swal("Expense Added", "", "success");
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
            <label for="description" className="label-style-add-expense">
              Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br /> <br />
            <label for="amount" className="label-sty le-add-expense" style={{}}>
              Total Amount
            </label>
            <input
              type="text"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <label for="owner_amount" className="label-style-add-expense">
              You{" "}
            </label>
            <input
              type="text"
              name="owner_amount"
              onChange={(e) => setOwnerAmount(e.target.value)}
            />
            <Row>
              <Col xs={12} md={6}>
                <label for="owner_amount" className="label-style-add-expense">
                  Split with{" "}
                </label>
              </Col>
              <Col xs={12} md={6}>
                <label for="owner_amount" className="label-style-add-expense">
                  Amount
                </label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={6}>
                <select onChange={(e) => setFriend1(e.target.value)}>
                  {friendsOption}
                </select>
              </Col>
              <Col xs={12} md={6}>
                <input
                  type="text"
                  name="friend1Amount"
                  onChange={(e) => setFriend1Amount(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={6}>
                <select onChange={(e) => setFriend2(e.target.value)}>
                  {friendsOption}
                </select>
              </Col>
              <Col xs={12} md={6}>
                <input
                  type="text"
                  name="friend2Amount"
                  onChange={(e) => setFriend2Amount(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={6}>
                <select onChange={(e) => setFriend3(e.target.value)}>
                  {friendsOption}
                </select>
              </Col>
              <Col xs={12} md={6}>
                <input
                  type="text"
                  name="friend3Amount"
                  onChange={(e) => setFriend3Amount(e.target.value)}
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
