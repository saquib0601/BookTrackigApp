import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userReducer";
import { checkValidData } from "../utils/validate";
import Header from "./Header";
import Grid from "@mui/material/Grid";


const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // validate the form data

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    //signin or signup logic
    if (!isSignInForm) {
      // SignUp logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid style={{border:'10px'}} item lg={4} md={4} sm={8} xs={12}>
      <form
        className="p-[50px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-white rounded-[8px]"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email  Address"
          className="p-4 my-4 w-full bg-white rounded-[8px]"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-white rounded-[8px]"
        />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-4 my-4 rounded-lg w-full cursor-pointer bg-[#5ce8e1] font-medium"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer font-medium"
        onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to BookApp? SignUp Now"
            : "Already Registered ? SignIn Now"}
        </p>
      </form>
      </Grid>
      </Grid>
    </div>
  );
};

export default Login;