const mongoose = require("mongoose");
const vaild = require("validator");
const user = mongoose.model("users", {
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true,
  },
  balnace: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error("invaild value");
    },
  },
  transction: {
    type: Array,
  },
});

module.exports = user;
