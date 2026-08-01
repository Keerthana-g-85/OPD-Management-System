import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToken } from "../redux/LoginSlice";
export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3040/graphql", {
        query: `
    mutation {
      loginUser(
        input: {
          email: "${login.email}"
          password: "${login.password}"
        }
      ) {
        success
        message
        accesstoken
      }
    }
  `,
      });
      console.log(response);
      console.log(response.data.data.loginUser.success);
      if (response.data.data.loginUser.success === true) {
        dispatch(addToken(response.data.data.loginUser.accesstoken));
        localStorage.setItem("token", response.data.data.loginUser.accesstoken);
        nav("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box>
        <Paper>
          <Typography>E-mail</Typography>
          <TextField
            value={login.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
          />
          <Typography>Password</Typography>
          <TextField
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
          />
          <Button onClick={handleLogin}>Login</Button>
        </Paper>
      </Box>
    </>
  );
}
