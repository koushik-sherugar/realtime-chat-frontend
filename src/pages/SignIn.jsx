import React, { useState } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { setToken } from "../functions/helper";
import { useAuthContext } from "../context/AuthContext";

const SignIn = () => {
  let navigate = useNavigate();
  const { setUser } = useAuthContext();
  // Local states
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    console.log("formValues -->", formValues);
    try {
      const response = await axios.post(
        // `${process.env.SERVER_URL}/auth/local`,
        "http://localhost:1337/api/auth/local",
        {
          identifier: formValues?.email,
          password: formValues?.password,
        }
      );
      console.log("response -->", response);
      if (response?.data?.user) {
        //   // set jwt
        setToken(response.data.jwt);
        setUser(response.data.user);

        navigate("/chat-board");
        toast.success("User Signed in sucessfully");
      }
    } catch (error) {
      // Show error message

      // alert if user not found
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
        return;
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
        return;
      }

      console.error("Failed to sign in:", error);
    }
  };

  return (
    <main className="flex justify-center w-full mt-7 ">
      {/* Login form */}
      <div className="flex flex-col max-w-md gap-4 md:w-1/2">
        {/* title */}
        <p className="text-3xl font-bold text-left text-accentblue">Login</p>
        {/* card */}
        <section className="flex flex-col w-full gap-3 border-2 rounded-md shadow-md min-w-md border-accentblue p-7 ">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            className="p-1 border border-gray-300"
          />
          <input
            type="password"
            className="p-1 border border-gray-300"
            placeholder="Password"
            onChange={(e) => {
              setFormValues({ ...formValues, password: e.target.value });
            }}
          />
          <button
            className="p-2 my-1 text-white bg-accentblue "
            onClick={handleSignIn}
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-accentblue">
              Sign Up
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignIn;

// const login = async (email, password) => {
//   try {
//     const response = await axios.post('http://localhost:1337/auth/local', {
//       identifier: email,
//       password: password,
//     });
//     localStorage.setItem('token', response.data.jwt);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// };
