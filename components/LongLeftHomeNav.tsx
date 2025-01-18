"use client";
import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaRegRegistered } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

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

  const handleLinkClick = () => {
    onClose();
  };

  // Remove body class manipulation as it's causing layout issues
  useEffect(() => {
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        transition-transform duration-300 ease-in-out
        w-64 md:w-[240px] 
        h-screen
        bg-white border-r border-gray-200
        z-40
      `}
    >
      <div className="flex flex-col h-full pt-16 md:pt-0">
        <div className="flex-1 overflow-y-auto lg:mt-20">
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

        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => {
              handleSignout();
              onClose();
            }}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 group-hover:text-red-600 transition-colors duration-200">
              <IoIosLogOut className="text-2xl" />
            </span>
            <span className="ml-3 text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LongLeftHomeNav;