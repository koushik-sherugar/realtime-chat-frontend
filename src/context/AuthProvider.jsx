// # components/AuthProvider/AuthProvider.jsx

import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BEARER } from "../functions/constants";
import { useEffect } from "react";
import { getToken } from "../functions/helper";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken();
  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      // const response = await axios.get(`${process.env.SERVER_URL}/users/me`, {
      const response = await axios.get("http://localhost:1337/api/users/me", {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      // Extract the user data from the response
      const data = response?.data;

      // Update your state with the user data
      setUserData(data);
    } catch (error) {
      console.error(error);
      //   message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
