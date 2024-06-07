import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../Context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext); // Destructure user from UserContext

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, user]); 

  return (
    <>
      <Navbar />
      <div className="px-8 md:-mt-12 -mt-12 md:w-[80%] md:mx-auto min-h-[80vh] pt-7 pb-10">
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts
            .slice()
            .reverse()
            .map((post) => (
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
      </div>
      <Footer />
    </>
  );
};

export default Home;
