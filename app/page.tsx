"use client";
import "./styles.css";
import { useState } from "react";

import AddTodo from "./AddTodo.js";
import TaskList from "./TaskList.js";

let nextId = 3;

const initialTodos = [
  { id: 0, title: "Buy Milk", done: true },
  { id: 1, title: "Eat tacos", done: false },
  { id: 2, title: "Brew tea", done: false },
];

export default function MyTodos() {
  const [todos, setTodos] = useState(initialTodos);

  //functions

  function handleAddTodo(addTodo) {
    setTodos([...todos, { id: nextId++, title: addTodo, done: false }]);
  }

  // match id
  const sameId = (a, b) => a.id === b.id;
  // update todo matches id
  const updateId = (newText, todo) => (sameId(todo, newText) ? newText : todo);
  function handleEditTodo(newText) {
    setTodos(todos.map((todo) => updateId(newText, todo)));
  }

  function handleDeleteTodo(delId) {
    setTodos(todos.filter((e) => e.id !== delId));
  }

  // html generation
  return (
    <div>
      {/* add todo and handleAdd */}
      <AddTodo todos={todos} onAddTodo={handleAddTodo} />
      {/* pass todo edit and delete */}
      <TaskList
        todos={todos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}
