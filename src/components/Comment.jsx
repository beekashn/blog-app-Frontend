import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { UserContext } from "../Context/UserContext";

const Comment = ({ comment, post, setComments }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.put(
        URL + "/api/comments/" + comment._id,
        {
          comment: editedComment,
        },
        {
          withCredentials: true,
        }
      );
      // Update the local state with the updated comment text and updated time
      setComments((prevComments) =>
        prevComments.map((c) =>
          c._id === comment._id
            ? { ...c, comment: editedComment, updatedAt: res.data.updatedAt }
            : c
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      // Remove the deleted comment from the local state
      setComments((prevComments) => prevComments.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-2 bg-[#d5def5] rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          <span className="text-[#00ED64]">@</span>
          {comment.author}
        </h3>
        <div className="flex justify-center items-center space-x-4 text-[12px] md:text-base">
          <p>{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(comment.updatedAt).toString().slice(16, 21)}</p>

          {user?._id === comment?.userId && (
            <div className="flex justify-center items-center space-x-2 text-base">
              <p className="md:cursor-pointer">
                <BiEdit onClick={handleEditClick} color="blue" />
              </p>
              <p
                className="md:cursor-pointer"
                onClick={() => deleteComment(comment._id)}
              >
                <MdDelete color="red" />
              </p>
            </div>
          )}
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedComment}
            onChange={handleEditChange}
            rows="2"
            className="w-full p-2 mt-2 border rounded-md"
          ></textarea>
          <button
            onClick={handleEditSubmit}
            className="bg-gray-800 text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0 rounded-xl hover:bg-black md:cursor-pointer"
          >
            Submit
          </button>
        </div>
      ) : (
        <p className="px-4 mt-2 ">{comment.comment}</p>
      )}
    </div>
  );
};

export default Comment;
