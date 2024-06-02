import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userReducer";
import { USER_AVATAR } from "../utils/constants";
import LOGO from "../assests/images/logo.png";
import Button from "@mui/material/Button";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // below function is takecare by onAuthStateChanged ( firebase )
        // navigate("/")
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/login");
      }
    });

    // this will be called when component is unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="sticky top-0 px-8 py-4 bg-gradient-to-b from-blue-200 to-sky-100 z-10 w-full flex justify-between items-center mb-2.5">
      <img className="w-44" src={LOGO} alt="logo" />
      <h1 className="font-bold text-black font-sans text-xl">
        Book Tracking App
      </h1>

      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12" alt="usericon" src={USER_AVATAR} />
          <Button
            className="font-bold text-white"
            onClick={handleSignOut}
            variant="contained"
          >
            SignOut
          </Button>
          <div>{user.displayName}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
