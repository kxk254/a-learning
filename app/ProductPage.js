"use client";
import { useCallback } from "react";
import ShippingForm from "./ShippingForm.js";

export default function ProductPage({ referredId, productId, theme }) {
  const handleSubmit = (orderDetails) => {
    console.log("print", referredId, productId, orderDetails);
  };

  console.log("function reference", handleSubmit);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
