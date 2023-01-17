const express = require("express");
const { getUsers, createUser } = require("../controllers/userControllers");
const router = express.Router();
// /api/user/
router.route("/").get(getUsers).post(createUser);

module.exports = router;
