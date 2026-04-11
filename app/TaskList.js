"use client";

import { useState } from "react";

export default function TaskList({ todos, onAddTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task doto={todo} onAdd={onAddTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onAdd, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  let onEditContent;
  if (isEdit) {
    onEditContent = <>isedit</>;
  } else {
    onEditContent = <>noedit</>;
  }
  return;
  <label>
    <input />
    {onEditContent}
    <button>Delete</button>
  </label>;
}
