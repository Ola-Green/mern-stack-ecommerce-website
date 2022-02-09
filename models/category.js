const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },

    cat: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 32,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
