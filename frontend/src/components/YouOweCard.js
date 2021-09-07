import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/you-owe-card.css';
export default function YouOweCard() {
    return (
        <>
            <Card style={{ width: '25rem', height: '25rem' }}>
                <Card.Body>
                    <Card.Title className="card-title">You owe
                    </Card.Title>
                    <Card style={{ width: '23rem', height: '5.5rem' }}>
                        <Card.Body>
                            <Card.Text className="owe-card-text">
                                <strong> Monali </strong> <br />
                                Lunch <br />
                                Rs. 400
                                <div className="pay-button-div">
                                    <button className="pay-button">Pay</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card style={{ width: '23rem', height: '5.5rem' }}>
                        <Card.Body>
                            <Card.Text className="owe-card-text">
                                <strong> Aarushi </strong> <br />
                                Dinner <br />
                                Rs. 500
                                <div className="pay-button-div">
                                    <button className="pay-button">Pay</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card style={{ width: '23rem', height: '5.5rem' }}>
                        <Card.Body>
                            <Card.Text className="owe-card-text">
                                <strong>  Monali </strong> <br />
                                Groceries <br />
                                Rs. 200
                                <div className="pay-button-div">
                                    <button className="pay-button">Pay</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    );
}