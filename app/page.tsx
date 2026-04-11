"use client";
import { useState } from "react";

export default function NestForm() {
  const [form, setForm] = useState({
    name: "Kenji Konno",
    status: {
      address: "abc road",
      age: 45,
      email: "abc@de@fg",
    },
  });
  function nameHandler(e) {
    setForm({ ...form, name: e.target.value });
  }
  function addHandler(e) {
    setForm({ ...form, status: { ...form.status, address: e.target.value } });
  }
  function ageHandler(e) {
    setForm({ ...form, status: { ...form.status, age: e.target.value } });
  }
  function emHandler(e) {
    setForm({ ...form, status: { ...form.status, email: e.target.value } });
  }

  return (
    <>
      <p>
        Name:
        <input value={form.name} onChange={nameHandler} />
      </p>
      <p>
        Address:
        <input value={form.status.address} onChange={addHandler} />
      </p>
      <p>
        Age:
        <input value={form.status.age} onChange={ageHandler} />
      </p>
      <p>
        Email:
        <input value={form.status.email} onChange={emHandler} />
      </p>
      <p>
        {form.name} {form.status.address} {form.status.age} {form.status.email}
      </p>
    </>
  );
}
