// # context/AuthContext.js
import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   fetchSignInMethodsForEmail,
//   sendEmailVerification,
//   updateProfile,
//   sendSignInLinkToEmail,
//   isSignInWithEmailLink,
//   signInWithEmailLink,
// } from "firebase/auth";
// import { auth } from "../firebase-config";
// import { createUser } from "../functions/authFunctions";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {
//   const [user, setUser] = useState({});
//   const [emailVerified, setEmailVerified] = useState(
//     user?.emailVerified || false
//   );

//   function signIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // If user doesnot exist then show alert
//   async function signUp(email, password, firstName, lastName) {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await updateProfile(user, {
//         displayName: `${firstName} ${lastName}`,
//       });
//       // Create a user in the database after successful sign-up
//       await createUser(user);

//       return user;
//     } catch (error) {
//       console.error("Failed to sign up:", error);
//       throw error;
//     }
//   }

//   // async function signUp(email, password, firstName, lastName) {
//   //   return await createUserWithEmailAndPassword(auth, email, password)
//   //     .then((userCredential) => {
//   //       const user = userCredential.user;
//   //       updateProfile(user, {
//   //         displayName: `${firstName} ${lastName}`,
//   //       });

//   //     })
//   //     .catch((error) => {
//   //       console.error("Failed to sign up:", error);
//   //     });

//   function logOut() {
//     return signOut(auth);
//   }

//   function googleSignIn() {
//     const googleAuthProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleAuthProvider);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userAuthContext.Provider
//       value={{
//         user,
//         signIn,
//         signUp,
//         logOut,
//         googleSignIn,
//       }}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//   return useContext(userAuthContext);
// }
