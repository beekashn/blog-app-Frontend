import { IMAGE_FOLDER } from "../url";

const ProfilePosts = ({ post }) => {
  return (
    <div className="w-full flex flex-col md:flex-row mt-8 space-x-4 scroll-snap-align-center relative z-10">
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

        <div className="flex justify-between items-center mb-2 md:mb-4 text-sm font-semibold text-gray-500">
          <p>
            <span className="text-[#00ED64]">@</span>
            {post.username}
          </p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>

        <p className="text-sm md:text-lg text-justify">{post.desc.slice(0, 200) + "..."}</p>
      </div>
    </div>
  );
};

export default ProfilePosts;
