import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const nav = useNavigate();
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
      console.log(response)
      console.log(response.data.data.loginUser.success)
      if (response.data.data.loginUser.success === true){
        nav("/dashboard");
      }
    
    } catch (error) {
        console.log(error)
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
