import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './Header';
import AuthContext from '../context/AuthProvider';


const Dashboard = () => {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
      return null; // Don't display anything if the user is not logged in
    }
    
    return (
        <div>
           <Header />
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
