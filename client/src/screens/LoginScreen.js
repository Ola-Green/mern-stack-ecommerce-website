import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

export const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passView, setPassview] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Row className="auth-landing">
        <Col>
          <div>
            <br />
            <br />
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Enter Your Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="pass">
                <Form.Group>
                  <Form.Label>Enter Your Password</Form.Label>
                  <Form.Control
                    type={passView ? "text" : "password"}
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <small onClick={() => setPassview(!passView)}>
                    {passView ? "HIDE" : "SHOW"}
                  </small>
                </Form.Group>
              </div>
              <Link to="/forgotpassword">Forgot Password?</Link>

              <div style={{ textAlign: "center" }}>
                <Button type="submit" className="btn-auth">
                  Sign In
                </Button>
              </div>
            </Form>
            <Row className="py-3" style={{ paddingLeft: "80px" }}>
              <Col>
                <span className="text-customer">New Customer ? </span>
                <Link
                  style={{ color: "#75AD21" }}
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  <strong>Register</strong>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className="login-img-contain">
          <div className="login-img">
            <Image src="/images/w.jpg" thumbnail style={{ border: "none" }} />
          </div>
        </Col>
      </Row>
    </>
  );
};
