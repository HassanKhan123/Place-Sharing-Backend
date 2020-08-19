const express = require("express");

const {getUsers,login,signup} = require('../controllers/users-controller')

const router = express.Router();

router.get("/", getUsers);



router.post("/signup", signup);
router.post("/login", login);





module.exports = router;
