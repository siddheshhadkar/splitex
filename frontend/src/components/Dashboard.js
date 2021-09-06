import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import LandingNavbar from './LandingNavbar'
import '../styles/dashboard.css'

export default function Dashboard() {
    return (
        <>
            <LandingNavbar />
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <h2 className="label">Payments</h2>
                        <Button className="add-expense-btn"> Add an expense</Button>
                        <hr className="page-title-separator" />
                    </Col>
                    <Col xs={12} md={4}>

                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
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
                    </Col>
                    <Col xs={12} md={4}>
                        <Card style={{ width: '25rem', height: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-title">You are owed</Card.Title>
                                <Card style={{ width: '23rem', height: '5.5rem' }}>
                                    <Card.Body>
                                        <Card.Text className="owed-card-text">
                                            Siddhesh
                                            <div className="owed-card-amount">
                                                Rs. 400
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <br />
                                <Card style={{ width: '23rem', height: '5.5rem' }}>
                                    <Card.Body>
                                        <Card.Text className="owed-card-text">
                                            Priyansh
                                            <div className="owed-card-amount">
                                                Rs. 400
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <br />

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card style={{ width: '25rem', height: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="right-section-card-title">Your balance</Card.Title>
                                <hr className="title-separator" />
                                <Button className="add-balance-btn"> Add Balance</Button>

                                <Card.Text className="balance-div">
                                    Rs. 1000
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={8}>
                        <h2 className="label">Transaction History</h2>
                        <hr className="separator" />
                    </Col>
                    <Col xs={12} md={4}>

                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>

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
                    </Col>


                    <Col xs={12} md={4}>
                        <br />
                        <Card className="friends-card" style={{ width: '25rem', height: '20rem' }}>
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
                    </Col>
                </Row>


            </Container>
        </>
    );
}
