import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Login() {
  const [formValue, setFormValue] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <div>
    <Header/>
    <Grid
      container
      justifyContent={"center"}
      height={"100vh"}
      alignItems={"center"}
    >
      <Grid
        style={{ background: "white", width: "100%" }}
        justifyContent={"center"}
        alignItems={"center"}
        container
      >
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <Grid container item justifyContent={"center"} alignItems={"center"}>
          <Grid
            mt={2}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              onChange={(e) => {
                setFormValue({ ...formValue, userName: e.target.value });
              }}
              id="outlined-basic"
              label="User Name"
              variant="outlined"
            />
          </Grid>
          <Grid
            mt={2}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              onChange={(e) => {
                setFormValue({ ...formValue, password: e.target.value });
              }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid ml={-9} container justifyContent={"center"} alignItems={"center"}>
          <Button>Forget Password</Button>
        </Grid>
        <Grid mt={2} container justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={() => {
              localStorage.setItem("userName", formValue.userName);
              localStorage.setItem("isAuth", true);
              navigate("/")
            }}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}
