import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const PublicLayout = () => (
  <div className="app-layout auth-background">
    <Navbar />
    <main className="app-content auth-center">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;