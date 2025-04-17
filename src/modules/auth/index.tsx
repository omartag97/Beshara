import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./views/Login"));
const Registration = lazy(() => import("./views/Registration"));

export default function AuthRoot() {
  return (
    <Routes>
      <Route index path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
    </Routes>
  );
}
