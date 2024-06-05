import { useEffect } from "react";
import { IMAGE_FOLDER } from "../url";
import { IoArrowForwardCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const HomePosts = ({ post }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [post]);

  // Use useMediaQuery to determine screen size
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <motion.div
      initial={{ opacity: 0, x : -100 }}
      whileInView={{ opacity: 1, x : 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        // stiffness: 100,
        // damping: 10,
        duration: 0.8,
        ease: "easeOut",
      }}
      className="w-full flex flex-col md:flex-row mt-16 space-x-4 scroll-snap-align-center relative z-10"
    >
      {/* left div */}
      <div className="md:w-[35%] h-[200px] flex justify-center items-center object-cover">
        <img
          src={IMAGE_FOLDER + post.photo}
          alt=""
          className="w-full h-[220px] mt-4 object-cover rounded-2xl active:scale-95 duration-200"
        />
      </div>

      {/* right div */}
      <div className="flex flex-col md:w-[65%] mt-10 md:mt-0">
        <h1 className="md:text-2xl text-justify text-xl font-bold md:mb-2 mb-1">
          {post.title}
        </h1>

        <div className="flex justify-between md:items-center mb-2 md:mb-4 text-sm font-semibold text-gray-500">
          <p>
            <span className="text-[#00ED64]">@</span>
            {post.username}
          </p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>

        {/* Conditionally render sliced description based on screen size */}
        <p className="text-sm md:text-lg text-justify ">
          {isMobile
            ? post.desc.slice(0, 150) + "..."
            : post.desc.slice(0, 200) + "..."}
        </p>
        <div className="flex gap-2 items-center justify-end px-4 rounded-full">
          <p className="text-blue-800 active:scale-95 duration-200 hover:text-red-600">
            Read more
          </p>
          <IoArrowForwardCircle
            className={`text-red-500 hover:text-blue-800 duration-300`}
            size={25}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePosts;
