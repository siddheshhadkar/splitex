import React from "react";
import { Card } from "react-bootstrap";

import "../../styles/friends-card.css";

export default function FriendsCard() {
  return (
    <>
      <Card
        className="friends-card"
        style={{ width: "25rem", height: "20rem" }}
      >
        <Card.Body>
          <Card.Title className="right-section-card-title">Friends</Card.Title>
          <hr className="title-separator" />
          <Card.Text className="friends-text">
            Aarushi <br /> <hr />
            Monali <br /> <hr />
            Priyansh <br /> <hr />
            Siddhesh <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
