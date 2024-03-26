const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      unique: false,
    },
    lastName: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
        "Must use a valid email address",
      ],
    },
    country: {
      type: String,
      unique: false,
    },
    phoneNumber: {
      type: String,
      match: [/^(?:\+61|0)[4578]([0-9]{8})$/, "Must use a valid phone number"],
      unique: false,
    },
    enquiries: [
      {
        type: String,
        unique: false,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("enquiryCount").get(function () {
  return this.enquiries.length;
});

const User = model("User", userSchema);

module.exports = User;
