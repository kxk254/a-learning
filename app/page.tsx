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

  function handleAddTodo(addText) {
    setTodos((prev) => [
      ...prev,
      { id: nextId++, title: addText, done: false },
    ]);
  }

  // compare
  const matchId = (a, b) => a.id === b.id;
  // update to new
  const updateTitle = (newTitle, oldTitle) =>
    matchId(newTitle, oldTitle) ? newTitle : oldTitle;
  function handleEditTodo(newTitle) {
    setTodos((prev) => prev.map((todo) => updateTitle(newTitle, todo)));
  }

  function handleDeleteTodo(delId) {
    setTodos((prev) => prev.filter((d) => d.id !== delId));
  }

  return (
    <label>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </label>
  );
}
