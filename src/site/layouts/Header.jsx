import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../store/AuthStore";
import logo from "../../assets/images/logo.png";
import { Icon } from "@iconify/react";
import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const loading = useAuthStore((state) => state.loading);

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleclick = (path) => {
    navigate(path);
    setOpen(false);
  };

  // close dropdown when click outside
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
    <header className="w-full bg-[#214252] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto h-[70px] px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <span className="text-xl md:text-2xl font-semibold text-white italic">
            AreyaPulse
          </span>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <span onClick={() => navigate("/")} className="text-white cursor-pointer font-semibold italic hover:text-slate-200">
            Home
          </span>
          <span onClick={() => navigate("/posts")} className="text-white cursor-pointer font-semibold italic hover:text-slate-200">
            Blogs
          </span>
          <span onClick={() => navigate("/about")} className="text-white cursor-pointer font-semibold italic hover:text-slate-200">
            About
          </span>
          <span onClick={() => navigate("/contact")} className="text-white cursor-pointer font-semibold italic hover:text-slate-200">
            Contact
          </span>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="hidden md:flex items-center bg-white/10 border border-white/20 rounded-full px-4 h-9 backdrop-blur-md">
            <Icon icon="mdi:magnify" width="20" className="text-white" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="bg-transparent outline-none px-2 text-white placeholder:text-slate-300 w-[180px] lg:w-[220px]"
            />
          </div>

          {/* USER */}
          {user ? (
            <div className="relative" ref={menuRef}>

              {/* Profile Button */}
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="hidden sm:block text-white font-semibold italic">
                  {user.name}
                </span>

                <Icon
                  icon="bxs:down-arrow"
                  width="10"
                  height="10"
                  className="text-white hidden sm:block"
                />

                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center bg-gradient-to-br from-[#214252] via-[#4A6B78] to-[#F5F6F7]">
                  <Icon
                    icon="heroicons:user-20-solid"
                    width="24"
                    className="text-slate-500"
                  />
                </div>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-[linear-gradient(405deg,_#214252_0%,_#2E5666_35%,_#4A6B78_68%,_#D1D5DB_92%,_#F5F6F7_100%)] backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50">

                  <button
                    onClick={() => handleclick("/admin/dashboard")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-100 hover:bg-slate-800"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </button>

                  <button
                    onClick={() => handleclick("/admin/profile")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-100 hover:bg-slate-800"
                  >
                    <FaUser />
                    Profile
                  </button>

                  <div className="border-t border-slate-200" />

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : loading ? ("") :(
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_58%,_#F5F6F7_100%)] px-4 py-2 text-sm border border-white text-[#09222e] font-semibold rounded-md hover:opacity-90"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_58%,_#F5F6F7_100%)] px-4 py-2 text-sm border border-white text-[#09222e] font-semibold rounded-md hover:opacity-90"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile menu */}
          <button className="lg:hidden text-white ml-2">
            <Icon icon="mdi:menu" width="28" />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;