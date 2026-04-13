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

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case "changed": {
      return tasks.map((task) =>
        task.id === action.newtask.id ? action.newtask : task,
      );
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function MyTask() {
  const [state, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({ type: "added", id: nextId++, text: text, done: false });
  }

  function handleEditTask(task) {
    dispatch({ type: "changed", newtask: task });
  }

  function handleDeleteTask(id) {
    dispatch({ type: "deleted", id: id });
  }

  return (
    <>
      <AddTask onAddTodo={handleAddTask} />
      <TaskList
        tasks={state}
        onEditTodo={handleEditTask}
        onDeleteTodo={handleDeleteTask}
      />
    </>
  );
}
