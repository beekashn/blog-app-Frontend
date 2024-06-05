import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Comment from "../components/Comment";
import ConfirmDialogueBox from "../components/ConfirmDialogueBox"; 
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL, IMAGE_FOLDER } from "../url";
import { UserContext } from "../Context/UserContext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [showDialog, setShowDialog] = useState(false); 
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleDeletePost = () => {
    // Show custom confirmation dialog
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = () => {
    // Hide custom dialog
    setShowDialog(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/comments/create",
        {
          userId: user._id,
          author: user.username,
          postId: postId,
          comment: comment,
        },
        { withCredentials: true }
      );
      fetchPostComments();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 md:w-[80%] md:mx-auto mt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-black">
              {post.title}
            </h1>

            {user?._id === post.userId && (
              <div className="flex justify-center items-center space-x-2">
                <p
                  onClick={() => navigate("/edit/" + postId)}
                  className="md:cursor-pointer"
                >
                  <BiEdit
                    color="blue"
                    className="hover:scale-110 duration-300"
                  />
                </p>
                <p onClick={handleDeletePost} className="md:cursor-pointer">
                  <MdDelete
                    color="red"
                    className="hover:scale-110 duration-300"
                  />
                </p>
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mt-2 md:mt-4 ">
              <p>
                <span className="text-[#00ED64]">@</span>
                {post.username}
              </p>
              <div className="flex space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
              </div>
            </div>
            <img
              src={IMAGE_FOLDER + post.photo}
              alt=""
              className="w-full mx-auto mt-8 rounded-2xl"
            />

            {/* Content */}
            <div className="mx-auto mt-8 text-justify">
              {post.desc &&
                post.desc.split("\n").map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                    <br />
                  </p>
                ))}
            </div>

            {/* Categories section */}
            <div className="flex flex-col md:flex-row items-center mt-8 space-x-4 space-y-2 md:space-y-0 font-semibold">
              <p>Categories : </p>
              <div className="w-full md:w-fit flex flex-wrap justify-between md:mt-0 items-center space-x-2">
                {post.categories?.map((category, index) => (
                  <div key={index} className="bg-gray-400 rounded-lg px-3 py-1">
                    {category}
                  </div>
                ))}
              </div>
            </div>

            {/* Comment section */}
            <div className="flex flex-col mt-4">
              <h3 className="mt-6 mb-4 font-semibold ">COMMENTS : </h3>

              {/* comments */}
              {comments?.map((comment) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Comment
                    comment={comment}
                    post={post}
                    setComments={setComments}
                  />
                </motion.div>
              ))}
            </div>

            {/* write a comment */}
            <div className="w-full flex flex-col justify-between mt-4 md:flex-row md:space-x-4 ">
              <input
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                type="text"
                placeholder="write your comment...."
                className="md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0 border-b-2 rounded-md focus:border-blue-500 transition-colors duration-300"
              />
              <button
                onClick={(e) => postComment(e)}
                className="bg-gray-800 text-sm text-white px-4 py-2 ml-auto w-fit mt-4 md:mt-0 rounded-xl hover:bg-black"
              >
                Add Comment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Footer />
      {/* Render the custom dialog box */}
      {showDialog && (
        <ConfirmDialogueBox
          message="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default PostDetails;
