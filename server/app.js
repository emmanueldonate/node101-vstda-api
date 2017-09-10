const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const todos = [
  {
    todoItemId: 0,
    name: "an item",
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: "another item",
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: "a done item",
    priority: 1,
    completed: true
  }
];
// add your code here

//Respond with generic object.
app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

//Response with all items in the dataset
app.get("/api/TodoItems", (req, res) => {
  res.send(todos);
});

app.get("/api/TodoItems/:number", (req, res) => {
  todos.forEach(function(todo) {
    console.log({
      id: todos.todoItemId,
      param: req.params.number,
      boolean: todos.todoItemId === req.params.number
    });
    if (todo.todoItemId === parseInt(req.params.number)) {
      res.send(todo);
    }
  });
});

app.post("/api/TodoItems/", (req, res, next) => {
    todos.push(req.body);
    console.log(req.body);
    res.status(201).json(req.body);
});

app.delete("/api/TodoItems/:number", (req, res) => {
    todos.forEach(function(todo, index) {
        if (todo.todoItemId === parseInt(req.params.number)) {
        let remove = todos.splice(index, 1);
        console.log({ remove });
        return res.json(remove[0]);
        }
    });

    res.status(200).send('Awesome');
});

module.exports = app;
