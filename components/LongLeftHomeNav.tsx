"use client";
import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaRegRegistered } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface LongLeftHomeNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const LongLeftHomeNav = ({ isOpen, onClose }: LongLeftHomeNavProps) => {
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

  const handleOverlayClick = () => {
    onClose(); // Close the sidebar when the overlay is clicked
  };

  const handleLinkClick = () => {
    onClose(); // Close the sidebar when a link is clicked
  };

  return (
    <>
      {/* Overlay for Small Devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed md:relative
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-transform duration-300
          w-64 md:w-[240px] min-h-screen
          bg-white border-r border-gray-200
          z-40
          flex flex-col
        `}
      >
        {/* Scrollable Navigation Area */}
        <div className="flex-grow overflow-y-auto md:pt-0">
          <div className="p-4 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 group"
                onClick={handleLinkClick}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 group-hover:text-blue-600 transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout Button Container */}
        <div className="p-4 border-t border-gray-200 bg-white mt-auto mb-20">
          <button
            onClick={() => {
              handleSignout();
              onClose(); // Close the sidebar after signing out
            }}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 group-hover:text-red-600 transition-colors duration-200">
              <IoIosLogOut className="text-2xl" />
            </span>
            <span className="ml-3 text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default LongLeftHomeNav;
