const userMod = require("../../database/models/user.model");
const home = async (req, res) => {
  try {
    const data = await userMod.find();
    let show = data.length;
    res.render("home", { pageTitle: "HOME", data, show });
  } catch (e) {
    res.send("errow");
  }
};
const addCustomer = (req, res) => {
  res.render("addCustomer", { pageTitle: "Customer-User" });
};
const addNewCustmer = async (req, res) => {
  // const user = req.query
  // user.id=Date.now()
  const data = { ...req.query };
  try {
    const user = new userMod(data); //{name:fname, age:myage}
    await user.save();
    res.redirect("/");
  } catch (e) {
    res.send(e.message);
  }
};
const single = async (req, res) => {
  let showrtans = 0;
  try {
    const user = await userMod.findById(req.params.id);
    if (user) showrtans = user.transction.length;
    res.render("single", {
      pageTitle: user ? `user ${user.name} data` : "user not found",
      user,
      showrtans,
    });
  } catch (e) {
    res.send("error");
  }
  /* myCon((err, db) => {
    if (err) res.send(err);
    db.collection("data").findOne(
      { _id: new ObjectId(req.params.id) },
      (error, user) => {
        if (error) res.send("errow");
        if (user) showrtans = user.transction.length;
        res.render("single", { pageTitle: "Single-User", user, showrtans });
      }
    );
  }); */
};
const deleteuser = async (req, res) => {
  let showrtans = 0;
  try {
    const user = await userMod.findByIdAndDelete(req.params.id);
    res.redirect(`/`);
  } catch (e) {
    res.send("error");
  }
};
const addtransctionPost = async (req, res) => {
  let id = req.params.id;
  let trans = { ...req.body };
  try {
    const user = await userMod.findOneAndUpdate(
      { _id: id },
      { $push: { transction: trans } }
    );
    res.redirect(`/showuser/${id}`);
  } catch (e) {
    res.send("error");
  }
};
const addtransction = async (req, res) => {
  let id = req.params.id;
  try {
    const user = await userMod.findById({ _id: id });
    if (user) showrtans = user.transction.length;
    res.render("addtransction", { pageTitle: "Single-User", user, showrtans });
  } catch (e) {
    res.send("errow");
  }
};
/* const addtransctionPost = (req, res) => {
  let id = req.params.id;
  let trans = { ...req.body };
  myCon((err, db) => {
    if (err) res.send(err);
    .updateOne(
        db.collection("data")
        { _id: new ObjectId(req.params.id) },
        { $push: { transction: trans } }
      )
      .then(() => {
        res.redirect(`/showuser/${id}`);
      })
      .catch((e) => res.send(e));
  });
}; */

module.exports = {
  home,
  addCustomer,
  addNewCustmer,
  single,
  addtransction,
  addtransctionPost,
  deleteuser,
};
