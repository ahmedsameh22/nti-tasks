const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
const User = mongoose.model("users", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {},
});
const Users = new User({ name: "ahmed", age: 22 });
Users.save()
  .then((res) => console.log(res))
  .catch((e) => {
    console.log(e);
  });
