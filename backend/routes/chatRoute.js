const express = require("express");
const { accessChat, getallChats, createGrpchat, renameGrp, addUser, removeUser, leaveGrp } = require("../controllers/chatcontroller");
const { isAuthenticated } = require("../middelware/auth");

const router = express.Router();

router.route("/accessChat").post(isAuthenticated, accessChat);
router.route("/getallchats").get(isAuthenticated, getallChats);
router.route("/creategrpchat").post(isAuthenticated, createGrpchat);
router.route("/renamegroup").put(isAuthenticated, renameGrp);
router.route("/adduser").put(isAuthenticated, addUser);
router.route("/removeuser").put(isAuthenticated, removeUser);
router.route("/leavegrp").put(isAuthenticated, leaveGrp);


module.exports = router;