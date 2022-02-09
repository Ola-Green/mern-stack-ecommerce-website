const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/user");
const sendMail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!validateEmail(email))
//       return res.status(400).json({ msg: "Email is invalid" });

//     const user = await User.findOne({ email });

//     if (user) return res.status(400).json({ msg: "Email already exists" });

//     if (password.length < 6)
//       return res
//         .status(400)
//         .json({ msg: "Password must be at least 6 chars long" });

//     const passwordHash = await bcrypt.hash(password, 12);

//     const newUser = {
//       name,
//       email,
//       password: passwordHash,
//     };

//     const activation_token = createActivationToken(newUser);

//     const url = `${process.env.CLIENT_URL}/api/users/activate/${activation_token}`;

//     sendMail(email, url, "Please verify Your Email Address");

//     res.json({
//       msg: "Activation link has been sent to your email.",
//     });
//   } catch (e) {
//     return res.status(500).json({ msg: e.message });
//   }
// };

// const activateEmail = async (req, res) => {
//   try {
//     const { activation_token } = req.body;

//     const user = jwt.verify(
//       activation_token,
//       process.env.ACTIVATION_TOKEN_SECRET
//     );

//     const { name, email, password } = user;

//     const check = await User.findOne({ email });

//     if (check) return res.status(400).json({ msg: "This email is taken" });

//     const newUser = new User({
//       name,
//       email,
//       password,
//     });

//     await newUser.save();

//     res.json({ msg: "Account has been activated.Please log in" });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user)
//       return res.status(400).json({ msg: "This email does not exist" });

//     const isMatch = bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

//     const access_token = createAccessToken({ id: user._id });

//     const refresh_token = createRefreshToken({ id: user._id });

//     res.cookie("refreshtoken", refresh_token, {
//       httpOnly: true,
//       path: "/api/users/refresh_token",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({
//       msg: "Login Success",
//       access_token,
//       user: { ...user._doc, password: "" },
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// const getAccessToken = async (req, res) => {
//   try {
//     const rf_token = req.cookies.refreshtoken;

//     if (!rf_token) return res.status(400).json({ msg: "Please Login" });

//     jwt.verify(
//       rf_token,
//       process.env.REFRESH_TOKEN_SECRET,
//       async (err, result) => {
//         if (err) return res.status(400).json({ msg: "Please Login Now" });

//         const user = await User.findById(result.id).select("-password");

//         if (!user)
//           return res.status(400).json({ msg: "This user does not exist" });

//         const access_token = createAccessToken({ id: result.id });

//         res.json({ access_token, user });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     res.clearCookie("refreshtoken", { path: "/api/users/refresh_token" });

//     res.json({ msg: "Logged out" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "This email does not exist" });
    const access_token = createAccessToken({ id: user._id });
    const url = `${process.env.CLIENT_URL}/api/users/reset/${access_token}`;
    sendMail(email, url, "Please reset your password");
    res.json({ message: "Please check your email" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { password: passwordHash }
    );

    res.json({ message: "Password successfully changed" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

const createActivationToken = (payload) =>
  jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "30m" });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// function validateEmail(email) {
//   const regExp =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return regExp.test(email);
// }

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
};
