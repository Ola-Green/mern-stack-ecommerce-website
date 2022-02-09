const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
  authUser,
} = require("../controllers/user");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
// router.post("/login", login);
// router.post("/activate", activateEmail);
// router.post("/refresh_token", getAccessToken);
// router.post("/register", registerUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", protect, resetPassword);

module.exports = router;
