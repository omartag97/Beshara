import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Contact = lazy(() => import("./views/Contact"));

export default function ContactRoot() {
  return (
    <Routes>
      <Route index element={<Contact />} />
    </Routes>
  );
}
