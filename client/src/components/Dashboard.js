import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './Header';

const Dashboard = ({ isLoggedIn }) => {
    
    return (
        <div>
           <Header isLoggedIn={isLoggedIn} />
            <Container className="mt-5">
                <h2>Welcome to Your Dashboard</h2>
                <Row className="mt-4">
                    <Col md={4}>
                        <Button variant="primary" block>
                            Orders
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Button variant="success" block>
                            Profile
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
