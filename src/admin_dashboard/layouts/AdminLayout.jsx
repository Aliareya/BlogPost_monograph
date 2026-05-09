import React, { useEffect } from "react";
import AdminRoutes from "../../routes/AdminRoutes";
import { Sidebar } from "./Sidebar";
import useAuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import TopBar from "./Topbar";

function AdminLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const ADMIN_UID = "sZlPmGzhfYNYX0ZEM2mGYszzdbB2";
  const isAdmin = user?.uid === ADMIN_UID;

  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[linear-gradient(85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]
       flex items-center justify-center text-gray-100">
        Loading admin panel...
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-">
      <Sidebar />

      </div>

      {/* Sidebar */}

      {/* Main Area */}
      <div className="flex flex-col w-full ">

        {/* TopBar (FIXED - CLEAN COMPONENT) */}
        <div className="!z-50 w-full pl-64 sticky top-0">
        <TopBar />
          
        </div>

        {/* Page Content */}
        <div className="bg-[linear-gradient(85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
          <AdminRoutes />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;