const Todo = require("../models/Todo");

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.find({});

    res.status(200).json({
      status_code: 200,
      status: "success",
      message: "Todo data",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  const { name, items } = req.body;
  try {
    const todo = new Todo({
      name,
      items,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Checklist not found" });
    }
    // todo.items.push({ name, items });
    await todo.save();

    res.status(201).json({
      status_code: 201,
      status: "success",
      message: "Todo created",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      status_code: 200,
      status: "success",
      message: "Todo data",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const putTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status_code: 200,
      status: "success",
      message: "Todo data updated",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status_code: 200,
      status: "success",
      message: "Todo data deleted",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getTodo, createTodo, getTodoById, putTodo, deleteTodo };
