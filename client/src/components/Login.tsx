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
        nav("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Paper
          sx={{
            width: 400,
            padding: 3,
          }}
        >
          <Typography>E-mail</Typography>
          <TextField
            fullWidth
            value={login.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
          />
          <Typography>Password</Typography>
          <TextField
            fullWidth
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
          />
          <br />
          <Button sx={{ mt: 3 }} variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Paper>
      </Box>
    </>
  );
}
