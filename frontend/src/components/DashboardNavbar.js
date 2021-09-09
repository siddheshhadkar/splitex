import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import "../styles/dashboardNavbar.css";
import { NavLink } from "react-router-dom";

function DashboardNavbar(props) {
  const logOutHandler = () => {
    localStorage.removeItem("token");
    props.toggleLogInState();
  };

  return (
    <>
      <Navbar className="navbar-colour">
        <Container>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="siteName" style={{ color: "#FFFFFF" }}>
              SplitEx
            </Navbar.Brand>
          </NavLink>
        </Container>

        <Container>
          <Navbar.Brand className="userName" style={{ color: "#F5F5F5" }}>
            John Doe
          </Navbar.Brand>
        </Container>

        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Button
            className="logoutBtn"
            style={{ marginRight: 50 }}
            onClick={logOutHandler}
          >
            Logout
          </Button>
        </NavLink>
      </Navbar>
    </>
  );
}

export default DashboardNavbar;
