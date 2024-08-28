const express = require("express");
const { registerUser, loginUser, getusers, getuserdetails, logoutUser } = require("../controllers/usercontroller");
const { isAuthenticated } = require("../middelware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/me/profile").get(isAuthenticated, getuserdetails);
router.route("/getusers").get(isAuthenticated, getusers);

module.exports = router;