import { useNavigate } from "react-router-dom";
import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../store/AuthStore";
import logo from "../../assets/images/logo.png"
import { Icon } from "@iconify/react";

const Header = () => {
  const navigate = useNavigate();

  // 👤 user from Zustand
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
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <span className="text-xl md:text-2xl font-semibold text-white italic">
            AreyaPulse
          </span>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#"
            className="text-white font-semibold italic hover:text-slate-200 transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white font-semibold italic hover:text-slate-200 transition"
          >
            Blogs
          </a>
          <a
            href="#"
            className="text-white font-semibold italic hover:text-slate-200 transition"
          >
            About
          </a>
          <a
            href="#"
            className="text-white font-semibold italic hover:text-slate-200 transition"
          >
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="hidden md:flex items-center bg-white/10 border border-white/20 rounded-full px-4 h-9 backdrop-blur-md">
            <Icon
              icon="mdi:magnify"
              width="20"
              height="20"
              className="text-white"
            />
            <input
              type="text"
              placeholder="Search blogs..."
              className="bg-transparent outline-none px-2 text-white placeholder:text-slate-300 w-[180px] lg:w-[220px]"
            />
          </div>

          {/* Login / Register */}
          <div className="hidden md:flex gap-2">
            <button className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_58%,_#F5F6F7_100%)] px-4 py-2 text-sm border border-white text-[#09222e] font-semibold rounded-md hover:opacity-90">
              Login
            </button>

            <button className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_58%,_#F5F6F7_100%)] px-4 py-2 text-sm border border-white text-[#09222e] font-semibold rounded-md hover:opacity-90">
              Register
            </button>
          </div>

          {/* User */}
          {/* <div className="flex items-center gap-2 cursor-pointer">
            <span className="hidden sm:block text-white font-semibold italic">
              Alireza
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
                height="24"
                className="text-slate-500"
              />
            </div>
          </div> */}

          {/* Mobile Menu */}
          <button className="lg:hidden text-white ml-2">
            <Icon icon="mdi:menu" width="28" height="28" />
          </button>
        </div>
      </div>
    </header>

  );
};

export default Header;