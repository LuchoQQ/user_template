const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "First name must have min 3 characters"],
      maxLength: [15, "First name must have max 15 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minLength: [3, "Last name must have min 3"],
      maxLength: [15, "Last name must have max 15 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minLength: 7,
    },
    password: {
      type: String,
      required: [true, "passsword is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
