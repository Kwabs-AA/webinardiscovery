"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Userbutton from "./userbutton";
import ShortLeftHomeNav from "./ShortLeftHomeNav";
import LongLeftHomeNav from "./LongLeftHomeNav";
import { SessionProvider } from "next-auth/react";

const Navbar = ({ children }: any) => {
  const [shortnav, setShortnav] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShortnav(true);
  }, []);

  const handleNav = () => {
    setIsAnimating(true);
    setShortnav(!shortnav);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const navVariants = {
    hidden: {
      x: -300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <div className="navbar bg-base-100 border-b-2 border-gray-300 sticky top-0 z-50 h-16">
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

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Short Nav - Only visible when not animating and shortnav is true */}
        {shortnav && !isAnimating && <ShortLeftHomeNav />}

        {/* Long Nav - Animated */}
        <AnimatePresence
          mode="wait"
          onExitComplete={handleAnimationComplete}
        >
          {!shortnav && (
            <motion.div
              key="long"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed md:relative z-40"
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={handleAnimationComplete}
            >
              <LongLeftHomeNav isOpen={!shortnav} onClose={handleNav} />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;