import React from "react";
import { Card } from "react-bootstrap";

import "../../styles/friends-card.css";

export default function FriendsCard() {
  return (
    <>
      <Card className="friends-card" style={{ width: "auto", height: "auto" }}>
        <Card.Body>
          <Card.Title className="friend-section-card-title">Friends</Card.Title>
          <hr className="title-separator" />
          <div className="friends-text">
            Aarushi <br /> <hr />
            Monali <br /> <hr />
            Priyansh <br /> <hr />
            Siddhesh <br />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
