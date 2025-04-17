import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Products = lazy(() => import("./views/Products"));
const ProductDetails = lazy(() => import("./views/ProductDetails"));

export default function ProductsRoot() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path=":id" element={<ProductDetails />} />
    </Routes>
  );
}
