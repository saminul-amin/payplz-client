import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

export default function Main() {
  return (
    // <div className="max-w-7xl mx-auto">
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
