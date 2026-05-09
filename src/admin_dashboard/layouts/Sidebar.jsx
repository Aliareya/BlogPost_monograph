import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export const Sidebar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Overview",
      icon: "solar:widget-2-bold",
    },
    {
      path: "/admin/posts",
      name: "Posts",
      icon: "solar:document-text-bold",
    },
    {
      path: "/admin/comments",
      name: "Comments",
      icon: "solar:chat-round-dots-bold",
    },
    {
      path: "/admin/messages",
      name: "Messages",
      icon: "solar:letter-bold",
    },
  ];

  return (
    <aside className="w-64 min-h-screen fixed left-0 top-0 bg-[#214252] text-white shadow-2xl flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon icon="solar:pen-new-square-bold" width="20" />
          </div>

          <span className="text-xl font-bold italic">
            Areya Admin
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? 'bg-[linear-gradient(156deg,_#214252_0%,_#2E5666_35%,_#4A6B78_55%,_#D1D5DB_70%,_#F5F6F7_100%)] border border-white text-white'
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon icon={item.icon} width="20" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          <Icon icon="solar:arrow-left-linear" width="20" />
          Back to Blog
        </button>
      </div>
    </aside>
  );
};