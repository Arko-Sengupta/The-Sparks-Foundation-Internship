import React from "react";
import {
    Container,
    Form,
    Card,
    Button,
    InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaIdCard, FaLock, FaEnvelope } from "react-icons/fa";
import "../Stylesheets/BankSignUp.css";

const InputField = ({ type, placeholder, icon: Icon }) => (
    <Form.Group className="my-4">
        <InputGroup>
            <InputGroup.Text className="signup-icon-background">
                <Icon className="signup-icon-color" />
            </InputGroup.Text>
            <Form.Control
                type={type}
                placeholder={placeholder}
                className="signup-input-shadow"
            />
        </InputGroup>
    </Form.Group>
);

const BankSignUp = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="signup-bg">
            <Card className="signup-card">
                <Card.Body>
                    <h3 className="text-center signup-gradient-text my-5">REGISTRATION</h3>
                    <Form className="align-items-center">
                        <InputField type="text" placeholder="Name" icon={FaUser} />
                        <InputField type="email" placeholder="Email" icon={FaEnvelope} />
                        <InputField type="tel" placeholder="Phone Number" icon={FaPhone} />
                        <InputField type="text" placeholder="PAN Number" icon={FaIdCard} />
                        <InputField type="password" placeholder="Password" icon={FaLock} />
                        <Button variant="primary" type="submit" className="my-3 w-100 signup-button">
                            Register Now
                        </Button>
                        <p className="text-center">Already have an account? <span className="signup-login-navigate" onClick={() => navigate("/login")}>Login Here</span></p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};


export default BankSignUp;