import { FaHome } from "react-icons/fa"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { IoIosHelpCircle } from "react-icons/io"
import { FaRegRegistered } from "react-icons/fa"
import { IoIosLogOut } from "react-icons/io"
import Link from "next/link"
import { signOut } from "next-auth/react"

const LongLeftHomeNav = () => {
  const navItems = [
    { href: "/", label: "Home", icon: <FaHome className="text-2xl" /> },
    { href: "/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard className="text-2xl" /> },
    { href: "/help", label: "Help", icon: <IoIosHelpCircle className="text-2xl" /> },
    { href: "/form", label: "Register", icon: <FaRegRegistered className="text-2xl" /> },
  ]

  const handleSignout = async () => {
    await signOut({
      redirect: false
    })
  }

  return (
    <aside className="min-w-[240px] h-[calc(100vh-64px)] bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 group"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 group-hover:text-blue-600 transition-colors duration-200">
                {item.icon}
              </span>
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
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
  )
}

export default LongLeftHomeNav