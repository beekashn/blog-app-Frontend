import { Link, useLocation } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaTimes } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi";
import { useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const menuRef = useRef(null);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(prompt ? `?search=${prompt}` : "/");
      setPrompt("");
    }
  };

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [prompt, navigate]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="sticky top-0 bg-blue-500 bg-opacity-20 backdrop-filter backdrop-blur-md md:w-[80%] mx-auto shadow-lg z-20 rounded-full"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">
            <span className="text-red-700 textShadow md:text-2xl">i</span>
            <span>-</span>
            <span className="text-blue-800 textShadow md:text-2xl">Blog</span>
          </Link>
        </h1>
        {path === "/" && (
          <div className="flex justify-center items-center space-x-2">
            <input
              className="custom-input w-[200px] md:w-[300px] outline-none px-3 py-1 rounded-lg border-b-2 focus:border-blue-700"
              type="text"
              placeholder="Search post...."
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
            <p
              className="cursor-pointer hover:text-blue-800"
              onClick={() => {
                navigate(prompt ? `?search=${prompt}` : "/");
                setPrompt("");
              }}
            >
              <IoSearchSharp size={20} />
            </p>
          </div>
        )}

        <div className="hidden md:flex items-center justify-center space-x-4">
          {user ? (
            <h3 className="font-bold border-b-2 mr-6 hover:border-red-600 transition-all ease duration-500">
              <Link to="/Write">Write</Link>
            </h3>
          ) : (
            <Link
              to="/login"
              className="text-red-600 font-bold border border-red-600 px-4 py-1 hover:bg-red-500 hover:text-white transition-all ease duration-500 rounded-xl"
            >
              <h3>Login</h3>
            </Link>
          )}
          {user ? (
            <div onClick={handleMenu} className="cursor-pointer">
              {menu ? <FaTimes size={24} /> : <TfiMenuAlt size={24} />}
            </div>
          ) : (
            <Link
              to="/register"
              className="text-blue-600 font-bold border border-blue-600 px-4 py-1 hover:bg-blue-500 hover:text-white transition-all ease duration-500 rounded-xl"
            >
              <h3>Register</h3>
            </Link>
          )}
        </div>

        <div className="md:hidden" onClick={handleMenu}>
          <p className="relative">
            {menu ? <FaTimes size={24} /> : <TfiMenuAlt size={24} />}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <Menu onClose={() => setMenu(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <motion.div
        className={`fixed -bottom-[80vh] md:-right-20 right-2 p-2 bg-blue-700 rounded-full cursor-pointer ${
          showScroll ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <FiChevronUp size={24} color="white" />
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
