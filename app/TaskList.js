"use client";

import { useState } from "react";

export default function TaskList({ todos, onEditTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task todo={todo} onEdit={onEditTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onEdit, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  let todoContent;
  if (isEdit) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onEdit({ ...todo, title: e.target.value });
          }}
        />
        <button onClick={() => setIsEdit(false)}>Save</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEdit(true)}>Edit</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        value={todo.done}
        onChange={(e) => {
          onEdit({ ...todo, done: e.target.checked });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}
