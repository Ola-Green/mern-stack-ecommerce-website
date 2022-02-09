const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password should be 8 character long"],
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("remove", async function (next) {
//   await this.model("Review").deleteMany({ userId: this._id });
//   await this.model("Order").deleteMany({ userId: this._id });

//   next();
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const SaltFactor = await bcrypt.genSalt(10);

//   this.password = await bcrypt.hash(this.password, SaltFactor);

//   next();
// });

// userSchema.methods.genAuthToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIREIN,
//   });
// };

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
