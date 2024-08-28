import React, { useState } from "react";
import { useAuthContext, useUserAuth } from "../context/AuthContext";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { setToken } from "../functions/helper";

const SignUp = () => {
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  let navigate = useNavigate();

  // Local states
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to handle sign up
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/local/register`,
        {
          username: formValues?.name,
          email: formValues?.email,
          password: formValues?.password,
        }
      );

      if (response?.data?.user) {
        setUser(response.data.user);
        // set jwt
        setToken(response.data.jwt);

        navigate("/chat-board");
        toast.success("Signed up sucessfully");
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center w-full mt-7 ">
      {/* Login form */}
      <div className="flex flex-col max-w-md gap-4 md:w-1/2">
        {/* title */}
        <p className="text-3xl font-bold text-left text-accentblue">SignUp</p>
        {/* card */}
        <section className="flex flex-col w-full gap-3 border-2 rounded-md shadow-md min-w-md border-accentblue p-7 ">
          {/*  Name */}
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            className="p-1 border border-gray-300"
          />

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            className="p-1 border border-gray-300"
          />
          {/* Password */}
          <input
            type="password"
            className="p-1 border border-gray-300"
            placeholder="Password"
            onChange={(e) => {
              setFormValues({ ...formValues, password: e.target.value });
            }}
          />

          {error && <p className="text-red-500">{error}</p>}
          <button
            className="p-2 my-1 text-white bg-accentblue "
            onClick={handleSignUp}
          >
            Login
          </button>

          <p className="text-center">
            Already have account? &nbsp;
            <a href="/signin" className="text-accentblue">
              Sign in
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUp;
