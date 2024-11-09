import { Outlet } from "react-router-dom";
import TravelNavbar from "../navbar";

function AdminTravelLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <TravelNavbar />
      <Outlet />
    </div>
  );
}

export default AdminTravelLayout;
