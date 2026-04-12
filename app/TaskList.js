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
  let onEditContent;
  if (isEdit) {
    onEditContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => onEdit({ ...todo, title: e.target.value })}
        />
        <button onClick={() => setIsEdit(false)}>Save</button>
      </>
    );
  } else {
    onEditContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEdit(true)}>Edit</button>
      </>
    );
  }
  return (
    <>
      <input
        type="checkbox"
        value={todo.done}
        onChange={(e) => e.target.checked}
      />
      {onEditContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </>
  );
}
