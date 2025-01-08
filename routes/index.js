const express = require("express");

const user_route = require("./user_route");
const todo_route = require("./todo_route");

const router = express.Router();

router.use(user_route);
router.use(todo_route);

module.exports = router;
