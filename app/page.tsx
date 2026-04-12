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
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTodo(text) {
    dispatch({ type: "added", id: nextId++, text: text });
  }

  function handleEditTodo(task) {
    dispatch({ type: "changed", task: task });
  }

  function handleDeleteTodo(taskId) {
    dispatch({ type: "deleted", id: taskId });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTodo={handleAddTodo} />
      <TaskList
        tasks={tasks}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
      />
      <ul>
        <p>------------------------</p>
        {tasks.map((task) => (
          <li key={task.id}>
            ID:: {task.id} - TEXT:: {task.text} - DONE:: {task.done}
          </li>
        ))}
      </ul>
    </>
  );
}
