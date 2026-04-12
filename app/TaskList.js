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
  let onEditTitle;
  if (isEdit) {
    onEditTitle = (
      <>
        <input
          value={todo.title}
          onChange={(e) => onEdit({ ...todo, title: e.target.value })}
        />
        <button onClick={() => setIsEdit(false)}>Save</button>
      </>
    );
  } else {
    onEditTitle = (
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
      {onEditTitle}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}
