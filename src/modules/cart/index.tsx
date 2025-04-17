import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Cart = lazy(() => import("./views/Cart"));

export default function CartRoot() {
  return (
    <Routes>
      <Route index element={<Cart />} />
    </Routes>
  );
}
