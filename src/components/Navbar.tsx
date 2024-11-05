// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useMe } from "@/hooks/auth/useMe";
// import { useLogout } from "@/hooks/auth/useLogout";
// import { motion, AnimatePresence } from "framer-motion";
// import { RxCross2 } from "react-icons/rx";
// import { IoIosMenu } from "react-icons/io";
// import { MdDarkMode, MdLightMode } from "react-icons/md";
// import { usePathname } from "next/navigation";
// import Button from "./Button";

// const Navbar = () => {
//   const { user } = useMe();
//   const { logout } = useLogout();
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const pathname = usePathname();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (darkMode) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     }
//   };

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-lg py-4 transition-colors duration-300">
//       <div className="container mx-auto px-5">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link
//               href="/"
//               className="text-3xl font-bold text-black dark:text-white transition"
//             >
//               TecQue
//             </Link>
//           </div>

//           {/* Centered Desktop Menu */}
//           <div className="hidden md:flex items-center flex-1 justify-center gap-6">
//             {["/", "/about", "/contact"].map((path) => (
//               <Link
//                 key={path}
//                 href={path}
//                 className={`text-black dark:text-white font-medium transition duration-300 relative group ${
//                   pathname === path ? "text-blue-600" : ""
//                 }`}
//               >
//                 {path === "/"
//                   ? "Home"
//                   : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
//                 <span
//                   className={`absolute bottom-0 left-0 w-full h-1 bg-blue-600 ${
//                     pathname === path ? "scale-x-100" : "scale-x-0"
//                   } group-hover:scale-x-100 transition-transform duration-300`}
//                 ></span>
//               </Link>
//             ))}
//           </div>

//           {/* User Options and Dark Mode Toggle */}
//           <div className="hidden md:flex items-center gap-4">
//             <motion.button
//               onClick={toggleDarkMode}
//               className="text-2xl text-black dark:text-white transition-colors duration-300 hover:scale-110"
//               whileHover={{ rotate: 20 }}
//               whileTap={{ rotate: -20 }}
//               aria-label="Toggle Dark Mode"
//             >
//               {darkMode ? <MdLightMode /> : <MdDarkMode />}
//             </motion.button>
//             {user ? (
//               <button
//                 onClick={() => logout()}
//                 className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-md transition duration-300 font-semibold"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 href="/sign-in"
//                 className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-md transition duration-300 font-semibold"
//               >
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Toggle Button */}
//           <motion.button
//             className="md:hidden text-3xl text-black dark:text-white focus:outline-none"
//             onClick={toggleMobileMenu}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {isMobileMenuOpen ? <RxCross2 /> : <IoIosMenu />}
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.4 }}
//             className="md:hidden bg-white dark:bg-gray-800 px-5 py-4 rounded-b-lg space-y-4"
//           >
//             {["/", "/about", "/contact"].map((path) => (
//               <Link
//                 key={path}
//                 href={path}
//                 className={`block text-black dark:text-white font-medium transition duration-300 ${
//                   pathname === path ? "text-blue-600" : ""
//                 }`}
//                 onClick={toggleMobileMenu}
//               >
//                 {path === "/"
//                   ? "Home"
//                   : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
//               </Link>
//             ))}
//             {user ? (
//               <Button
//                 className="font-semibold"
//                 onClick={() => {
//                   logout();
//                   toggleMobileMenu();
//                 }}
//               >
//                 Logout
//               </Button>
//             ) : (
//               <Link
//                 href="/sign-in"
//                 className="block w-full text-left px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-md shadow-md transition duration-300 font-semibold"
//                 onClick={toggleMobileMenu}
//               >
//                 Login
//               </Link>
//             )}
//             <motion.button
//               onClick={toggleDarkMode}
//               className="text-2xl text-white transition-colors duration-300 hover:scale-110"
//               whileHover={{ rotate: 20 }}
//               whileTap={{ rotate: -20 }}
//               aria-label="Toggle Dark Mode"
//             >
//               {darkMode ? <MdLightMode /> : <MdDarkMode />}
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMe } from "@/hooks/auth/useMe";
import { useLogout } from "@/hooks/auth/useLogout";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { usePathname } from "next/navigation";
import Button from "./Button";

const Navbar = () => {
  const { user } = useMe();
  const { logout } = useLogout();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg py-4 transition-colors duration-300">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-3xl font-bold text-black dark:text-white transition"
            >
              TecQue
            </Link>
          </div>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-6">
            {["/", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                href={path}
                className={`text-black dark:text-white font-medium transition duration-300 relative group ${
                  pathname === path ? "text-blue-600" : ""
                }`}
              >
                {path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 bg-blue-600 ${
                    pathname === path ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100 transition-transform duration-300`}
                ></span>
              </Link>
            ))}
          </div>

          {/* User Options and Dark Mode Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={toggleDarkMode}
              className="text-2xl text-black dark:text-white transition-colors duration-300 hover:scale-110"
              whileHover={{ rotate: 20 }}
              whileTap={{ rotate: -20 }}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </motion.button>
            {user ? (
              <button
                onClick={() => logout()}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-md transition duration-300 font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-xl shadow-md transition duration-300 font-semibold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            className="md:hidden text-3xl text-black dark:text-white focus:outline-none"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <RxCross2 /> : <IoIosMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white dark:bg-gray-800 px-5 py-4 rounded-b-lg space-y-4"
          >
            {["/", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                href={path}
                className={`block text-black dark:text-white font-medium transition duration-300 ${
                  pathname === path ? "text-blue-600" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                {path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                {/* Add active underline effect */}
                {pathname === path && (
                  <span className="block h-1 bg-blue-600 rounded mt-1"></span>
                )}
              </Link>
            ))}
            {user && user.role === "admin" && (
              <>
                <Link
                  href="/dashboard/admin"
                  className={`block text-black dark:text-white font-medium transition duration-300 ${
                    pathname === "/dashboard/admin" ? "text-blue-600" : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                  {pathname === "/dashboard/admin" && (
                    <span className="block h-1 bg-blue-600 rounded mt-1"></span>
                  )}
                </Link>
                <Link
                  href="/dashboard/admin/manage-posts"
                  className={`block text-black dark:text-white font-medium transition duration-300 ${
                    pathname === "/dashboard/admin/manage-posts"
                      ? "text-blue-600"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Manage Posts
                  {pathname === "/dashboard/admin/manage-posts" && (
                    <span className="block h-1 bg-blue-600 rounded mt-1"></span>
                  )}
                </Link>
                <Link
                  href="/dashboard/admin/manage-users"
                  className={`block text-black dark:text-white font-medium transition duration-300 ${
                    pathname === "/dashboard/admin/manage-users"
                      ? "text-blue-600"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Manage Users
                  {pathname === "/dashboard/admin/manage-users" && (
                    <span className="block h-1 bg-blue-600 rounded mt-1"></span>
                  )}
                </Link>
                <Link
                  href="/dashboard/admin/payments"
                  className={`block text-black dark:text-white font-medium transition duration-300 ${
                    pathname === "/dashboard/admin/payments"
                      ? "text-blue-600"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Payments
                  {pathname === "/dashboard/admin/payments" && (
                    <span className="block h-1 bg-blue-600 rounded mt-1"></span>
                  )}
                </Link>
                <Link
                  href="/dashboard/admin/activity-logs"
                  className={`block text-black dark:text-white font-medium transition duration-300 ${
                    pathname === "/dashboard/admin/activity-logs"
                      ? "text-blue-600"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Activity Logs
                  {pathname === "/dashboard/admin/activity-logs" && (
                    <span className="block h-1 bg-blue-600 rounded mt-1"></span>
                  )}
                </Link>
              </>
            )}
            {user ? (
              <Button
                className="font-semibold"
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
              >
                Logout
              </Button>
            ) : (
              <Link
                href="/sign-in"
                className="block w-full text-left px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-md shadow-md transition duration-300 font-semibold"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
            )}
            <motion.button
              onClick={toggleDarkMode}
              className="text-2xl text-white transition-colors duration-300 hover:scale-110"
              whileHover={{ rotate: 20 }}
              whileTap={{ rotate: -20 }}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
