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

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(addTitle) {
    setTodos([...todos, { id: nextId++, title: addTitle, done: false }]);
  }

  function handleEditTodo(editTitle) {
    setTodos(
      todos.map((e) => {
        if (e.id === editTitle.id) {
          return editTitle;
        } else {
          return e;
        }
      }),
    );
  }

  function handleDeleteTodo(deleteId) {
    setTodos(todos.filter((t) => t.id !== deleteId));
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
