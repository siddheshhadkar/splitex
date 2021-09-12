import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "../styles/dashboardNavbar.css";
import { NavLink } from "react-router-dom";

function DashboardNavbar(props) {
  const logOutHandler = () => {
    localStorage.removeItem("token");
    props.toggleLogInState();
  };

  return (
    <>
      <Navbar className="navbar-colour" expand="lg">
        <Container>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="siteName" style={{ color: "#FFFFFF" }}>
              SplitEx
            </Navbar.Brand>
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Container> */}
            <Navbar.Brand className="userName" style={{ color: "#F5F5F5" }}>
              {props.userName}
            </Navbar.Brand>

            <NavLink to="/" className="logoutBtn" onClick={logOutHandler}>
              Logout
            </NavLink>
            {/* </Container> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DashboardNavbar;
