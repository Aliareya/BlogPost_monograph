import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import useAuthStore from "../../store/AuthStore";

export default function TopBar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // close dropdown outside click
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-16 !z-50 bg-[#214252] backdrop-blur-xl border-b border-white/20 shadow-sm flex items-center justify-between px-6">

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-100 px-4 h-10 rounded-full w-[300px]">
        <Icon icon="mdi:magnify" width="20" className="text-slate-500" />
        <input
          type="text"
          placeholder="Search dashboard..."
          className="bg-transparent outline-none px-2 w-full text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
          <Icon icon="solar:bell-bold" width="20" className="text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        {user && (
          <div className="relative" ref={menuRef}>

            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer bg-slate-100 px-3 py-2 rounded-full hover:bg-slate-200 transition"
            >
              <div className="w-8 h-8 rounded-full bg-[#214252] flex items-center justify-center text-white">
                <Icon icon="heroicons:user-20-solid" width="18" />
              </div>

              <span className="text-sm font-medium text-slate-700 hidden sm:block">
                {user.name}
              </span>

              <Icon icon="bxs:down-arrow" width="10" className="text-slate-500" />
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">

                <button
                  onClick={() => {
                    navigate("/admin/profile");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 text-slate-700"
                >
                  <Icon icon="solar:user-bold" width="18" />
                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/admin/settings");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 text-slate-700"
                >
                  <Icon icon="solar:settings-bold" width="18" />
                  Settings
                </button>

                <div className="border-t border-slate-200" />

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500"
                >
                  <Icon icon="solar:logout-2-bold" width="18" />
                  Logout
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}