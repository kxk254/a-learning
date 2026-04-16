"use client";
import { useCallback, useState } from "react";
import ShippingForm from "./ShippingForm.js";

export default function ProductPage({ referredId, productId, theme }) {
  const [lastorder, setLastorder] = useState(null);
  const handleSubmit = useCallback(
    (orderDetails) => {
      setLastorder(orderDetails);
      console.log("print", referredId, productId, orderDetails);
      post("/product/" + productId + "/buy", { referredId, orderDetails });
    },
    [referredId, productId],
  );

  console.log("function reference", handleSubmit);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  console.log(url);
  console.log(data);
}
