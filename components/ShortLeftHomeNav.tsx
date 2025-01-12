import { FaHome } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaRegRegistered } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import Link
 from "next/link";
const ShortLeftHomeNav = () => {
  const navItems = [
    { href: "/", label: "Home", icon: <FaHome className="text-2xl" /> },
    { href: "/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard className="text-2xl" /> },
    { href: "/registration", label: "Register", icon: <FaRegRegistered className="text-2xl" /> },
    { href: "/help", label: "Help", icon: <IoIosHelpCircle className="text-2xl" /> },
  ];
  const handleSignout = async () =>{
    await signOut({
      redirect:false
    })
  }
  return (
    <div className="flex">
      
      <div className="w-20 h-[calc(100vh)] bg-base-200 flex flex-col items-center py-4 ">
        <div className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              aria-label={item.label}
              className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-base-300 transition"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      
        <div className="flex-grow"></div>
        <button
          aria-label="Logout"
          className="flex items-center w-full space-x-4 p-3 rounded-lg hover:bg-base-200 transition"
          onClick={handleSignout}
        >
          <IoIosLogOut className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ShortLeftHomeNav;
