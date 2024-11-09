import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

function JobsLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default JobsLayout;
