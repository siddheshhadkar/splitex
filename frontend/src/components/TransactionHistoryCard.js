
import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/transaction-history-card.css';
export default function TransactionHistoryCard() {
  return (
    <>

      <Card style={{ width: '53rem', height: '5rem' }}>
        <Card.Body>
          <Card.Title className="transaction-card-body">

            Siddesh paid you Rs.200
          </Card.Title>
          <Card.Text>
            <div className="transaction-card-date">September 2, 2021</div>

          </Card.Text>
          <br />
        </Card.Body>
      </Card>
      <br />
      <Card style={{ width: '53rem', height: '5rem' }}>
        <Card.Body>
          <Card.Title className="transaction-card-body">You paid Aarushi Rs.200
          </Card.Title>

          <Card.Text>
            <div className="transaction-card-date">September 2, 2021</div>

          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}