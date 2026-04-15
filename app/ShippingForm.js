"use client";
import { memo, useState } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = { ...Object.fromEntries(formData), count };
    onSubmit(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <button type="button" onClick={() => setCount((e) => e - 1)}>
          [-]
        </button>
        {count}
        <button type="button" onClick={() => setCount((e) => e + 1)}>
          [+]
        </button>
        <p>
          Street: <input name="street" />
        </p>
        <p>
          Country: <input name="country" />
        </p>
        <p>
          ZipCode: <input name="zip" />
        </p>
      </label>
      <button type="submit">[ Submit ]</button>
    </form>
  );
});

export default ShippingForm;
