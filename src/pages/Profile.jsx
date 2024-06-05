import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import { URL } from "../url";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      if (user && user._id) {
        const res = await axios.get(`${URL}/api/users/${user._id}`);
        setUsername(res.data.username);
        setEmail(res.data.email);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]); // Update when user changes

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        `${URL}/api/users/${user._id}`,
        {
          username,
          email,
        },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      if (user && user._id) {
        const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
        setPosts(res.data);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]); // Update when user changes

  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col-reverse md:flex-row px-4 md:w-[80%] md:mx-auto mt-8 md:space-x-10 min-h-[80vh]">
        {/* left div */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col w-full md:w-[80%]"
        >
          <h1 className="text-xl font-bold mt-4 border-blue-600 border-b-2 w-fit md:w-full">
            Your Posts
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            posts
              ?.slice()
              .reverse()
              .map((post) => <ProfilePosts key={post._id} post={post} />)
          )}
        </motion.div>

        {/* right div */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col space-y-4 w-full md:w-[30%]"
        >
          <div className="flex flex-col md:mt-32 bg-slate-200 px-4 py-2 rounded-xl shadow-xl">
            <h1 className="text-xl font-bold mt-2 md:mt-4 border-green-700 border-b-2 w-fit md:w-full">
              Profile
            </h1>

            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="px-4 py-2 mt-4 text-gray-500 outline-none border-b-8 rounded-xl"
              type="text"
              placeholder="Your Username"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-4 py-2 text-gray-500 outline-none rounded-xl"
              type="email"
              placeholder="Your Email"
            />

            <div className="flex items-center space-x-4 mt-8 md:pl-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUserUpdate}
                className="border px-4 py-1 bg-blue-800 rounded-xl text-white hover:translate-y-[-5px] transition-all ease duration-500"
              >
                Update
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUserDelete}
                className="border px-4 py-1 bg-red-700 rounded-xl text-white hover:translate-y-[-5px] transition-all ease duration-500"
              >
                Delete
              </motion.button>
            </div>

            {updated && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-blue-900 text-center bg-green-300 p-2 rounded-md shadow-lg mt-4"
              >
                ✅ Successfully Updated.
              </motion.h3>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
