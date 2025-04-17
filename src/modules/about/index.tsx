import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const About = lazy(() => import("./views/About"));

export default function AboutRoot() {
  return (
    <Routes>
      <Route index element={<About />} />
    </Routes>
  );
}
