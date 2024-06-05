import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-[#247291] mt-10 py-4 md:px-40 ">
        <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col mt-8 pb-4 w-full items-center space-y-4 md:space-y-0 md:space-x-12 md:flex-row">
              <div className="flex items-center gap-2">
                <MdEmail className="text-white" />
                <span className="text-white tracking-wider text-lg font-semibold">
                  7beekash7@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-white" />
                <span className="text-white tracking-wider text-lg font-semibold">
                  9815160963
                </span>
              </div>
            </div>
            <div className="flex gap-10  items-center md:cursor-pointer">
              <VscGithubAlt
                color="red"
                size={20}
                className="hover:scale-125 duration-300 md:cursor-pointer"
              />
              <FaFacebookF
                color="blue"
                size={20}
                className="hover:scale-125 duration-300 md:cursor-pointer"
              />
              <FaInstagram
                color="red"
                size={20}
                className="hover:scale-125 duration-300 md:cursor-pointer"
              />
              <FaLinkedinIn
                color="blue"
                size={20}
                className="hover:scale-125 duration-300 md:cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center mt-8">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-300">
              Contact
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-8">
        <div className="container flex flex-col md:flex-row items-center justify-around space-y-2 md:space-y-0 px-8">
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-semibold">Featured Blogs</p>
            <p className="text-lg font-semibold">Most Viewed</p>
            <p className="text-lg font-semibold">Readers Choice</p>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-semibold">Forum</p>
            <p className="text-lg font-semibold">Support</p>
            <p className="text-lg font-semibold">Recent Posts</p>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-semibold">Testimonials</p>
            <p className="text-lg font-semibold">Privacy Policy</p>
            <p className="text-lg font-semibold">About Us</p>
          </div>
        </div>
      </div>
      <p className="bg-gray-900 text-white py-4 text-center tracking-widest font-bold text-xl">
        All rights reserved @iBlog 2024
      </p>
    </>
  );
};

export default Footer;
