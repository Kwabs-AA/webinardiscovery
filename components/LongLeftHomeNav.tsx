import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaRegRegistered } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { signOut } from "next-auth/react";

const LongLeftHomeNav = () => {
  const navItems = [
    { href: "/", label: "Home", icon: <FaHome className="text-2xl" /> },
    { href: "/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard className="text-2xl" /> },
    { href: "/help", label: "Help", icon: <IoIosHelpCircle className="text-2xl" /> },
    { href: "/form", label: "Register", icon: <FaRegRegistered className="text-2xl" /> },
  ];

  const handleSignout = async () => {
    await signOut({
      redirect: false
    })
  }

  return (
    <div className="min-w-[240px] h-[calc(100vh-64px)] bg-base-300 flex flex-col items-start py-6 px-4">
      <div className="flex flex-col space-y-6 w-full">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center w-full space-x-4 p-3 rounded-lg hover:bg-base-200 transition"
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    
      <div className="flex-grow"></div>
      <button
        onClick={handleSignout}
        className="flex items-center w-full space-x-4 p-3 rounded-lg hover:bg-base-200 transition"
        aria-label="Logout"
      >
        <IoIosLogOut className="text-2xl" />
        <span className="text-lg font-medium">Logout</span>
      </button>
    </div>
  );
};


export default LongLeftHomeNav;
