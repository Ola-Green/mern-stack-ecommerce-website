import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/messages/Error";
import Success from "../components/messages/Success";
import FormContainer from "../components/FormContainer";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
import * as userAction from "../actions/userActions";
import * as userConstants from "../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: "#fff",
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const classes = useStyles();

  const { passwordForgot } = useSelector((state) => state);
  const { loading, error, message, success } = passwordForgot;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAction.forgotPassword(email));
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      {error && (
        <Error
          header="Auth Error"
          message={error}
          reset={userConstants.FORGOT_PASSWORD_SEND_RESET}
        />
      )}
      {success && (
        <Success
          header="Done"
          message={message}
          reset={userConstants.FORGOT_PASSWORD_SEND_RESET}
        />
      )}
      <FormContainer>
        <h1>Forgot Password</h1>
        <Form>
          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                className={classes.prgressColor}
              />
            ) : (
              <>Send Request</>
            )}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ForgotPassword;
