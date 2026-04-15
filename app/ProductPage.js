"use client";
import { useCallback } from "react";
import ShippingForm from "./ShippingForm.js";

export default function ProductPage({ referredId, productId, theme }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      console.log("print", referredId, productId, orderDetails);
    },
    [referredId, productId],
  );
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
