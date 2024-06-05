import { useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaPen,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBlog,
} from "react-icons/fa";

const Menu = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.1,
        ease: "easeOut",
      }}
      className="bg-gray-800 w-[50vw] md:w-[200px] p-4 flex flex-col items-start space-y-6 absolute md:top-6 top-2 right-6 md:right-0 md:px-8 rounded-xl z-50"
    >
      {!user && (
        <h3
          className={`text-md flex items-center space-x-2 ${
            isActive("/login")
              ? "text-red-500 underline"
              : "text-white hover:text-red-500"
          }`}
        >
          <Link to="/login">
            <FaSignInAlt className="mr-2" />
            Login
          </Link>
        </h3>
      )}
      {!user && (
        <h3
          className={`text-md flex items-center space-x-2 ${
            isActive("/register")
              ? "text-blue-400 underline"
              : "text-white hover:text-blue-400"
          }`}
        >
          <Link to="/register">
            <FaUserPlus className="mr-2" />
            Register
          </Link>
        </h3>
      )}
      {user && (
        <h3
          className={`text-md md:cursor-pointer flex items-center space-x-2 ${
            isActive("/")
              ? "text-cyan-400 underline"
              : "text-white hover:text-cyan-400"
          }`}
        >
          <Link to="/" className="flex items-center gap-3">
            <FaHome className="mr-2" size={19} />
            Home
          </Link>
        </h3>
      )}
      {user && (
        <h3
          className={`text-md md:cursor-pointer flex items-center space-x-2 ${
            isActive(`/profile/${user.username}`)
              ? "text-purple-400 underline"
              : "text-white hover:text-purple-400"
          }`}
        >
          <Link
            to={`/profile/${user.username}`}
            className="flex items-center gap-3"
          >
            <FaUser className="mr-2" size={16} />
            Profile
          </Link>
        </h3>
      )}
      {user && (
        <h3
          className={`text-md md:cursor-pointer flex items-center space-x-2 ${
            isActive("/write")
              ? "text-yellow-400 underline"
              : "text-white hover:text-yellow-400"
          }`}
        >
          <Link to="/write" className="flex items-center gap-3">
            <FaPen className="mr-2" size={16} />
            Write
          </Link>
        </h3>
      )}

      {user && (
        <h3
          className={`text-md md:cursor-pointer flex items-center space-x-2 ${
            isActive("/myBlogs/" + user._id)
              ? "text-green-400 underline"
              : "text-white hover:text-green-400"
          }`}
        >
          <Link to={"/myBlogs/" + user._id} className="flex items-center gap-3">
            <FaBlog className="mr-2" size={19} />
            myBlogs
          </Link>
        </h3>
      )}

      {user && (
        <h3
          className={`text-md md:cursor-pointer flex items-center space-x-2 ${
            isActive("/logout")
              ? "text-red-500 underline"
              : "text-white hover:text-red-500"
          }`}
          onClick={handleLogout}
        >
          <Link to="/logout" className="flex items-center gap-3">
            <FaSignOutAlt className="mr-2" size={19} />
            Logout
          </Link>
        </h3>
      )}
    </motion.div>
  );
};

export default Menu;
