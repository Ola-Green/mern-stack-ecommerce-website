import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/messages/Error";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { USER_REGISTER_RESET } from "../constants/userConstants";

export const RegisterScreen = ({ location, history }) => {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [passView, setPassview] = useState(false);
  const[confirmPass,setConfirmPass] = useState(false);

  const dispatch = useDispatch();

  
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage("Please enter required fields");
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <br />
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Error header="Auth Response" message={message} />}
        {error && (
          <Error
            header="Auth Response"
            message={error}
            reset={USER_REGISTER_RESET}
          />
        )}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="pass">
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={passView ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <small onClick={() => setPassview(!passView)}>
              {passView ? "HIDE" : "SHOW"}
              </small>
          </Form.Group>
          </div>
        <div className="pass">
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={confirmPass ? "text":"password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
            <small onClick = {e => setConfirmPass(!confirmPass)}>
              {passView ? "HIDE": "SHOW"}
            </small>
          </Form.Group>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" className="btn-auth">
              Register
            </Button>
          </div>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?{" "}
            <Link
              style={{ color: "#75AD21" }}
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              <strong>Login</strong>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};
