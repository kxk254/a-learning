"use client";
import { useCallback } from "react";
import ShippingForm from "./ShippingForm.js";

export default function ProductPage({ referredId, productId, theme }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      console.log({ referredId, orderDetails, productId });
    },
    [productId, referredId],
  );

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
