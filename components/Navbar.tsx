"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Userbutton from "./userbutton"
import ShortLeftHomeNav from "./ShortLeftHomeNav"
import LongLeftHomeNav from "./LongLeftHomeNav"
import { SessionProvider } from "next-auth/react"

const Navbar = ({ children }:any) => {
  const [shortnav, setShortnav] = useState(true)
  
  const handleNav = () => {
    setShortnav(!shortnav)
  }

  const navVariants = {
    hidden: {
      x: -300,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-base-100 border-b-2 border-gray-300 sticky top-0 z-50">
        <div className="flex-none">
          <motion.button 
            className="btn btn-square btn-ghost"
            onClick={handleNav}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </motion.button>
        </div>
        <div className="flex-1"></div>
        <div className="flex-none">
          <SessionProvider>
            <Userbutton />
          </SessionProvider>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {shortnav ? (
            <motion.div
              key="short"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ShortLeftHomeNav />
            </motion.div>
          ) : (
            <motion.div
              key="long"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LongLeftHomeNav />
            </motion.div>
          )}
        </AnimatePresence>
        
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Navbar