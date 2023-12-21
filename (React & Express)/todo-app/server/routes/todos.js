const express = require('express');
const Todos = require('../controller/todoController')

const router = express.Router();

/* GET users listing. */
router.get('/', Todos.showTodos)
  .get('/:id', Todos.viewTodo)
  .post('/', Todos.createTodo)
  .put('/:id', Todos.updateTodo)
  .delete('/:id', Todos.deleteTodo);

module.exports = router;
