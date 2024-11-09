import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Outlet />
    </div>
  );
}

export default AdminLayout;
