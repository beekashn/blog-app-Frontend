import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]); // New state variable for tags
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const textAreaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory();
      if (textAreaRef.current) {
        // Check if ref is available
        const currentValue = textAreaRef.current.value;
        const updatedValue =
          currentValue.substring(0, textAreaRef.current.selectionStart) +
          "\n" +
          currentValue.substring(
            textAreaRef.current.selectionEnd,
            currentValue.length
          );
        textAreaRef.current.value = updatedValue; // Update value using ref
      }
    }
  };

  const addCategory = () => {
    if (category.length > 0) {
      setTags([...tags, category]); // Add category to tags array
      setCategory(""); // Clear the input field
    }
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: tags, // Include tags in the post data
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });

      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      try {
        const previewURL = (window.URL || window.webkitURL).createObjectURL(
          selectedFile
        );
        setImagePreview(previewURL);
      } catch (error) {
        console.log("Error creating object URL:", error);
      }
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="px-6 md:w-[80%] md:mx-auto mt-8">
          <motion.h1
            className="font-bold md:text-3xl text-2xl mt-8 text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create a Post
          </motion.h1>
          <motion.form
            onSubmit={handleCreate}
            className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onKeyDown={handleKeyPress} // Add key press handler to the form
          >
            <motion.input
              type="text"
              placeholder="Enter Post Title"
              className="px-4 py-2 outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300
              rounded"
              onChange={(e) => setTitle(e.target.value)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex flex-col">
              <motion.input
                onChange={handleFileChange}
                type="file"
                className="px-4 py-2 outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              {imagePreview && (
                <motion.img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-2xl mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <motion.input
                  type="text"
                  placeholder="Enter post Category (Tag)"
                  className="px-4 py-2 outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onKeyDown={handleKeyPress}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  onClick={addCategory}
                  className="px-4 py-1 font-bold cursor-pointer rounded-xl text-white bg-blue-500 hover:bg-blue-900 transition-all ease duration-500"
                >
                  Add
                </motion.div>
              </div>

              {/* Displaying Added Tags */}
              <div className="flex mt-4 px-4 flex-wrap">
                {tags.map((tag, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-center items-center space-x-2 mr-4 mb-2 bg-gray-500 px-3 py-1 rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>{tag}</p>
                    <p
                      onClick={() => removeTag(i)}
                      className="text-white bg-black text-[8px] p-1 rounded-full cursor-pointer"
                    >
                      <ImCross />
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.textarea
              onChange={(e) => setDesc(e.target.value)}
              className="px-4 py-2 outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 rounded"
              cols="30"
              rows="10"
              placeholder="Write Post Description....."
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              ref={textAreaRef}
            />
            <motion.button
              onClick={handleCreate}
              className="px-4 py-2 md:w-[200px] mx-auto font-bold cursor-pointer rounded-xl text-white bg-blue-500 hover:bg-blue-900 transition-all ease duration-500"
            >
              Create
            </motion.button>
          </motion.form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreatePost;
