import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Route>

    <Route element={<PrivateRoute />}>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;