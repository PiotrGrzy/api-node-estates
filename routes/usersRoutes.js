const express = require("express");
const usersCotroller = require("../controllers/usersController");
const authCotroller = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authCotroller.signup); // new users
router.post("/login", authCotroller.login); // login

router
  .route("/")
  .get(usersCotroller.getAllUsers)
  .post(usersCotroller.createUser);
router
  .route("/:id")
  .get(usersCotroller.getUser)
  .patch(usersCotroller.updateUser)
  .delete(usersCotroller.deleteUser);

module.exports = router;
