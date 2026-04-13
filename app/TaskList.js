"use client";
import { useState } from "react";

export default function TaskList({ tasks, onEditTasks, onDeleteTasks }) {
  return (
    <ul>
      {tasks.map((todo) => (
        <li key={todo.id}>
          <Task todo={todo} onEdit={onEditTasks} onDelete={onDeleteTasks} />
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
          value={todo.text}
          onChange={(e) => onEdit({ ...todo, text: e.target.value })}
        />
        <button onClick={() => setIsEdit(false)}>Save</button>
      </>
    );
  } else {
    onEditContent = (
      <>
        {todo.text}
        <button onClick={() => setIsEdit(true)}>Edit</button>
      </>
    );
  }
  return (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onEdit({ ...todo, done: e.target.checked });
        }}
      />
      {onEditContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </>
  );
}
