import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";
import { UserContext } from "../Context/UserContext";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(true); 
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(URL + "/api/posts/user/" + user._id);
          setPosts(res.data);
          setNoResults(res.data.length === 0);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchPosts();
  }, [search, user]); 

  return (
    <div>
      <Navbar />
      <div className="px-8 -mt-10 md:w-[80%] md:mx-auto min-h-[80vh] flex flex-col-reverse">
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post._id}
                  to={user ? `/posts/post/${post._id}` : "/login"}
                >
                  <HomePosts post={post} />
                </Link>
              ))
            ) : (
              <h3 className="text-center font-bold mt-16 md:text-xl">
                No Blogs Available !!
              </h3>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};


export default MyBlogs;
