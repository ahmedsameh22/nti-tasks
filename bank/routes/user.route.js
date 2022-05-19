const router = require("express").Router();
const userController = require("../app/controller/user.controller");
router.get("/", userController.home);
router.get("/addCustomer", userController.addCustomer);
router.get("/addNewCustmer", userController.addNewCustmer);
router.get("/showuser/:id", userController.single);
router.get("/showuser/addtransction/:id", userController.addtransction);
router.post("/showuser/addtransction/:id/", userController.addtransctionPost);

module.exports = router;
