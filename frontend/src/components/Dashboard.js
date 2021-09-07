import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import LandingNavbar from './LandingNavbar';
import '../styles/dashboard.css';
import YouOweCard from './YouOweCard';
import YouAreOwedCard from './YouAreOwedCard';
import TransactionHistoryCard from './TransactionHistoryCard';
import FriendsCard from './FriendsCard';
import BalanceCard from './BalanceCard';

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
                        <YouOweCard />
                    </Col>
                    <Col xs={12} md={4}>
                        <YouAreOwedCard />
                    </Col>
                    <Col xs={12} md={4}>
                        <BalanceCard />
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
                        <TransactionHistoryCard />
                    </Col>


                    <Col xs={12} md={4}>
                        <br />
                        <FriendsCard />
                    </Col>
                </Row>


            </Container>
        </>
    );
}
