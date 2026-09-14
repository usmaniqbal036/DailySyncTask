import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const PrivateLayout = () => (
  <div className="app-layout">
    <Navbar />
    <main className="app-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PrivateLayout;