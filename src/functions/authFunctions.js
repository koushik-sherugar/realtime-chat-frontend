import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create a user in the database after successful login with firebase
export const createUser = async (res) => {
  try {
    console.log(" response from google sign in -->", res?.uid);
    await axios
      .post(`${process.env.REACT_APP_SERVERURL}/user/create-user`, {
        userId: res.uid,
        userName: res.displayName,
        email: res.email,
      })
      .then((res) => {
        console.log("response from create user -->", res);
      });
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};
