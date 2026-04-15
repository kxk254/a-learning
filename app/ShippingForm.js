"use client";
import { memo, useState } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = { ...Object.fromEntries(formData), count };
    onSubmit(orderDetails);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input />
        <button type="submit">Submit</button>
      </form>
    </>
  );
});

export default ShippingForm;
