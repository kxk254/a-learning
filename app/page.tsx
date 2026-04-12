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

  // compare function
  const sameId = (a, b) => a.id === b.id;
  // check sameid function
  const replaceToNew = (newText, oldTodo) =>
    sameId(newText, oldTodo) ? newText : oldTodo;
  function handleEditTodo(newText) {
    setTodos(todos.map((todo) => replaceToNew(newText, todo)));
  }

  function handleDelteTodo(delId) {
    setTodos((prev) => prev.filter((d) => d.id !== delId));
  }

  return (
    <div>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDelteTodo}
      />
    </div>
  );
}
