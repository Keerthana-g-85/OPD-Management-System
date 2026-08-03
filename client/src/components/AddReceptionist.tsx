import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddReceptionist() {
  const [receptionist, setReceptionist] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });
  function handleAddreceptionist() {}
  return (
    <>
      <Box>
        <Paper>
          <Typography>Name</Typography>
          <TextField
            required
            id="outlined-required"
            value={receptionist.name}
            onChange={(e) => {
              setReceptionist({ ...receptionist, name: e.target.value });
            }}
          />

          <Typography>Email</Typography>
          <TextField
            required
            id="outlined-required"
            value={receptionist.email}
            onChange={(e) => {
              setReceptionist({ ...receptionist, email: e.target.value });
            }}
          />

          <Typography>Phone Number</Typography>
          <TextField
            required
            id="outlined-required"
            value={receptionist.phone}
            onChange={(e) => {
              setReceptionist({ ...receptionist, phone: e.target.value });
            }}
          />

          <Typography>Age</Typography>
          <TextField
            required
            id="outlined-required"
            value={receptionist.age}
            onChange={(e) => {
              setReceptionist({ ...receptionist, age: e.target.value });
            }}
          />

          <Typography>Gender</Typography>
          <TextField
            required
            id="outlined-required"
            value={receptionist.gender}
            onChange={(e) => {
              setReceptionist({ ...receptionist, gender: e.target.value });
            }}
          />

          <Typography>Address</Typography>
          <TextField
            required
            id="outlined-required"
            value={receptionist.address}
            onChange={(e) => {
              setReceptionist({ ...receptionist, address: e.target.value });
            }}
          />

          <Button onClick={handleAddreceptionist}>Add receptionist</Button>
        </Paper>
      </Box>
    </>
  );
}
