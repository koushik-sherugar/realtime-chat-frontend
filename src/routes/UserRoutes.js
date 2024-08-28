import React from "react";
import { Navigate, Route } from "react-router-dom";
// import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
// import ProtectedRoute from "./ProtectedRoute";
// import Tasks from "../pages/Tasks";

const UserRoutes = () => {
  return (
    <>
      <Route path="*" element={<Navigate to="/signup" />} />
      {/* <Route path="/signin" element={<SignIn />} /> */}
      <Route path="/signup" element={<SignUp />} />
      {/* <Route
        path="/task-board"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      /> */}
    </>
  );
};

export default UserRoutes;
