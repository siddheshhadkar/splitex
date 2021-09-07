const mongoose = require("../db/db.config");
const { Schema } = mongoose;
require("mongoose-type-email");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
