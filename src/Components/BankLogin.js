import React from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Stylesheets/BankLogin.css";

const InputField = ({ type, placeholder, icon: Icon }) => (
  <Form.Group className="my-4">
    <InputGroup>
      <InputGroup.Text className="login-icon-background">
        <Icon className="login-icon-color" />
      </InputGroup.Text>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className="login-input-shadow"
      />
    </InputGroup>
  </Form.Group>
);

const RememberMeAndForgotPassword = () => (
  <Row className="mb-3">
    <Col>
      <Form.Check type="checkbox" label="Remember Me" />
    </Col>
    <Col className="text-end">
      <span className="login-forgot-password">Forgot Password?</span>
    </Col>
  </Row>
);

const BankLogin = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="login-bg">
      <Card className="login-card">
        <Card.Body>
          <h3 className="text-center login-gradient-text my-5">USER LOGIN</h3>
          <Form className="align-items-center">
            <InputField type="email" placeholder="Email" icon={FaEnvelope} />
            <InputField type="password" placeholder="Password" icon={FaLock} />
            <RememberMeAndForgotPassword />
            <Button variant="primary" type="submit" className="my-3 w-100 login-button">
              Login
            </Button>
            <p className="text-center">Don't have an account? <span className="login-forgot-password" onClick={() => navigate("/signup")}>Register Here</span></p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BankLogin;