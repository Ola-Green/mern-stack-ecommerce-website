export const valid = ({ name, email, password, confirmPassword }) => {
  const err = {};
  if (!name) {
    err.name = "Please Enter Your Full Name";
  } else if (name.length > 25) {
    err.name = "Full Name can only be 25 characters long";
  }

  if (!email) {
    err.email = "Please enter email address";
  } else if (!validateEmail(email)) {
    err.email = "Email format is invalid";
  }
  if (!password) {
    err.password = "Please enter your password";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 chars long";
  }

  if (!confirmPassword) {
    err.confirmPassword = "Password confirmation field must not be empty";
  } else if (password !== confirmPassword) {
    err.confirmPassword = "confirm password must match password";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
}
