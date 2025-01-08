const express = require("express");

const todo_controller = require("../controllers/todo_controller");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

router.get("/todos", authenticateJWT, todo_controller.getTodo);
router.get("/todo/:id", authenticateJWT, todo_controller.getTodoById);
router.post("/todo", authenticateJWT, todo_controller.createTodo);
router.put("/todo/:id", authenticateJWT, todo_controller.putTodo);
router.delete("/todo/:id", authenticateJWT, todo_controller.deleteTodo);

module.exports = router;
