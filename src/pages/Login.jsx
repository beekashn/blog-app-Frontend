import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(res.data);
      setRegistrationStatus("success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setRegistrationStatus("error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold ">
          <Link to="/">
            <span className="text-red-700">i</span>
            <span>-</span>
            <span className="text-blue-800">Blog</span>
          </Link>
        </h1>
      </div>

      <div className="w-full h-[70vh] flex justify-center items-center">
        <div className="w-[60%] md:w-[30%] flex flex-col justify-center items-center space-y-4">
          <h1 className="text-xl font-bold text-left">
            Log in to Your Account
          </h1>
          <input
            className="w-full px-4 py-2 border-[1px] border-black rounded-xl outline-none"
            type="text"
            placeholder="Enter your Email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border-[1px] rounded-xl border-black outline-none"
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 text-lg font-bold text-white bg-gray-700 rounded-lg hover:bg-blue-500 hover:text-black"
          >
            Log in
          </button>
          {registrationStatus === "success" && (
            <h3 className="text-green-500 text-center bg-green-200 p-2 rounded-md shadow-lg">
              ✅ Login Successful.
            </h3>
          )}
          {registrationStatus === "error" && (
            <h3 className="text-red-500 text-center bg-red-200 p-2 rounded-md shadow-lg">
              ❌ Something went wrong
            </h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <Link
              to="/register"
              className="text-blue-600 font-bold border border-blue-600 px-4 py-1 hover:bg-blue-500 hover:text-white transition-all ease duration-500 rounded-xl"
            >
              <h3>Register</h3>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
