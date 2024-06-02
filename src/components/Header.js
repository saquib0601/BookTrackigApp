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
    <div 
    className=" bg-[#d0d0d0] sticky top-0 px-8 py-4 z-10 w-full flex justify-between items-center mb-2.5">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center space-x-4">
          <img className="w-12 h-12 rounded-full" alt="usericon" src={USER_AVATAR} />
          <div className="flex flex-col items-start">
            <span className="font-semibold">{user.displayName}</span>
            <Button
              className="font-bold text-white mt-1"
              onClick={handleSignOut}
              variant="contained"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
