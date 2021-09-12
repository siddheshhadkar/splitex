import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
import GetUserService from "../services/GetUserService";
import GetAllUsersService from "../services/GetAllUsersService";

import "../styles/dashboard.css";
import "../styles/you-owe-card.css";

import "../services/AddExpenseService";
import DashboardNavbar from "./DashboardNavbar";
import YouOweCard from "./Dashboard components/YouOweCard";
import YouAreOwedCard from "./Dashboard components/YouAreOwedCard";
import TransactionHistoryCard from "./Dashboard components/TransactionHistoryCard";
import FriendsCard from "./Dashboard components/FriendsCard";
import BalanceCard from "./Dashboard components/BalanceCard";
import AddExpenseService from "../services/AddExpenseService";

var response = {};

export default function Dashboard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(null);
  const [friendsNameArray, setFriendsNameArray] = useState([]);
  const [friendsOption, setFriendsOption] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await GetUserService();
      if (userData.success && userData.data) {
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
            <YouOweCard />
          </Col>
          <Col xs={12} md={4}>
            <YouAreOwedCard />
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
          {/* <div className="form-element">
            <label for="friend_name" className="label-style-add-expense">
              With you and:{" "}
            </label>
            <select>
              {friendsOption}
              </select>
         <br />
            <label for="description" className="label-style-add-expense">
              Description:{" "}
            </label>
            <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
            <br /> <br />
            <label for="amount" className="label-sty le-add-expense" style={{}}>
              Total Amount 
            </label>
            <input type="text" name="amount" onChange={(e) => setAmount(e.target.value)} />
            
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
            <input type="text" name="owner_amount" onChange={(e) => setOwnerAmount(e.target.value)} />

            <label for="friend1_amount" className="label-style-add-expense">
              Monali
            </label>
            <input type="text" name="friend1_amount" onChange={(e) => setFriendAmount(e.target.value)} />

            <label
              className="label-style-add-expense"
              for="friend1_amount"
              style={{}}
            >
              Aarushi
            </label>

            <input type="text" name="friend2_amount" />
          </div> */}

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
