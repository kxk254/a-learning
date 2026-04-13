"use client";
import "./styles.css";
import { useState } from "react";
import { useReducer } from "react";

import AddTask from "./AddTask";
import TaskList from "./TaskList";

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: true },
];

function reducer(tasks, action) {
  switch (action.type) {
    case "add":
      return [
        ...tasks,
        { id: action.id, text: action.text, done: action.done },
      ];
    case "edit":
      return tasks.map((t) =>
        t.id === action.task.id ? { ...t, ...action.task } : t,
      );
    case "delete":
      return tasks.filter((t) => t.id !== action.id);
    default:
      throw Error("Unexpected action: " + action.type);
  }
}

export default function MyTask() {
  const [tasks, dispatch] = useReducer(reducer, initialTasks);

  function handleAddTasks(text) {
    dispatch({ type: "add", id: nextId++, text: text, done: false });
  }

  function handleEditTasks(edit) {
    dispatch({ type: "edit", task: edit });
  }

  function handleDeleteTasks(id) {
    dispatch({ type: "delete", id: id });
  }

  return (
    <>
      <AddTask onAddTask={handleAddTasks} />
      <TaskList
        tasks={tasks}
        onEditTasks={handleEditTasks}
        onDeleteTasks={handleDeleteTasks}
      />
    </>
  );
}
