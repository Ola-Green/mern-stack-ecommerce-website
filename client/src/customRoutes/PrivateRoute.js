import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userLogin } = useSelector((state) => state);
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
