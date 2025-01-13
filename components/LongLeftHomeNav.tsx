import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaRegRegistered } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const LongLeftHomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: <FaHome className="text-2xl" /> },
    { href: "/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard className="text-2xl" /> },
    { href: "/help", label: "Help", icon: <IoIosHelpCircle className="text-2xl" /> },
    { href: "/registration", label: "Register", icon: <FaRegRegistered className="text-2xl" /> },
  ];

  const handleSignout = async () => {
    await signOut({
      redirect: false,
    });
  };

  return (
    <>
      {/* Menu Button for Small Devices */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <Menu className="text-gray-700" />
      </button>

      {/* Overlay for Small Devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-transform duration-300
          w-64 md:w-[240px] h-screen
          bg-white border-r border-gray-200 flex flex-col
          z-50
        `}
      >
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 group"
                onClick={() => setIsOpen(false)} // Close on link click
              >
                <span className="inline-flex items-center justify-center w-10 h-10 group-hover:text-blue-600 transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-200">
          <button
            onClick={handleSignout}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 group-hover:text-red-600 transition-colors duration-200">
              <IoIosLogOut className="text-2xl" />
            </span>
            <span className="ml-3 text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default LongLeftHomeNav;
