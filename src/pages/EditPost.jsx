import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { URL, IMAGE_FOLDER } from "../url"; // Add IMAGE_FOLDER if it's defined similarly to URL
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState("");
  const [previewImage, setPreviewImage] = useState(""); // State to hold the preview image URL
  const textAreaRef = useRef(null);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
      setPhoto(res.data.photo); // Save the photo URL
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: categories,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      // Image Upload
      try {
        await axios.post(URL + "/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    // Post Update
    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });

      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();

    // Set the preview image when the component mounts
    if (photo) {
      setPreviewImage(IMAGE_FOLDER + photo);
    }
  }, [postId, photo]);

  const addCategory = () => {
    if (category.length > 0) {
      const updatedCategories = [...categories];
      updatedCategories.push(category);
      setCategory("");
      setCategories(updatedCategories);
    }
  };

  const deleteCategory = (i) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(i, 1);
    setCategories(updatedCategories);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage("");
    }
  };

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

  return (
    <>
      <div>
        <Navbar />
        <div className="px-6 md:px-[200px] mt-8">
          <h1 className="font-bold md:text-2xl text-xl mt-8">Update Post</h1>
          <form
            onSubmit={handleUpdate}
            className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
          >
            <input
              type="text"
              placeholder="Enter Post Title"
              className="px-4 py-2 outline-none border-b-2 focus:border-blue-500 transition-colors duration-300 rounded"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              onChange={handleFileChange}
              type="file"
              className="px-4 py-2 outline-none focus:border-blue-500 transition-colors duration-300 rounded"
            />

            {/* Display the preview image */}
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full mx-auto rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-col ">
              <div className="flex items-center space-x-4 md:space-x-8">
                <input
                  type="text"
                  placeholder="Enter post Category"
                  className="px-4 py-2 outline-none border-b-2 focus:border-blue-500 transition-colors duration-300 rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div
                  onClick={addCategory}
                  className="px-4 py-1 font-bold cursor-pointer rounded-xl text-red-500 border border-red-500 hover:bg-blue-700 hover:text-white hover:border-none transition-all ease duration-500"
                >
                  Add
                </div>
              </div>

              <div className="flex mt-4 px-4">
                {categories?.map((cat, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                  >
                    <p>{cat}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-black text-[8px] p-1 rounded-full cursor-pointer"
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              onChange={(e) => setDesc(e.target.value)}
              className="px-4 py-2 outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 rounded"
              cols="30"
              rows="10"
              placeholder="Write Post Description....."
              ref={textAreaRef}
              onKeyDown={handleKeyPress}
              value={desc}
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-1 md:w-[200px] mx-auto font-bold cursor-pointer rounded-xl text-red-500 border border-red-500 hover:bg-blue-700 hover:text-white hover:border-none transition-all ease duration-500"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-1 md:w-[200px] mx-auto font-bold cursor-pointer rounded-xl text-red-500 border border-red-500 hover:bg-gray-700 hover:text-white hover:border-none transition-all ease duration-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EditPost;
