// // main

// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useUserAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useUserAuth();

//   if (!user) {
//     return <Navigate to="/signup" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
