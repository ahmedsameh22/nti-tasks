const router = require("express").Router();
const userController = require("../app/controller/user.controller");
router.get("/", userController.home);
router.get("/add", userController.add);
router.get("/albums/:id", userController.single);

module.exports = router;
