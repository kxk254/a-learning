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

export default function MyTodo() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(addTitle) {
    setTodos([...todos, { id: nextId++, title: addTitle, done: false }]);
  }

  const sameId = (a, b) => a.id === b.id;
  const updateItem = (target) => (todo) =>
    sameId(todo, target) ? target : todo;
  function handleEditTodo(editTitle) {
    setTodos(todos.map(updateItem(editTitle)));
  }

  function handleDeleteTodo(delId) {
    setTodos(todos.filter((e) => e.id !== delId));
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
