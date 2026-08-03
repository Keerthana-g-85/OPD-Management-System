import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddParmacist() {
  const [parmacist, setParmacist] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });

  function handleAddparmacist(){}
  return (
    <>
      <Box>
        <Paper>
          <Typography>Name</Typography>
          <TextField
            required
            id="outlined-required"
            value={parmacist.name}
            onChange={(e) => {
              setParmacist({ ...parmacist, name: e.target.value });
            }}
          />

          <Typography>Email</Typography>
          <TextField
            required
            id="outlined-required"
            value={parmacist.email}
            onChange={(e) => {
              setParmacist({ ...parmacist, email: e.target.value });
            }}
          />

          <Typography>Phone Number</Typography>
          <TextField
            required
            id="outlined-required"
            value={parmacist.phone}
            onChange={(e) => {
              setParmacist({ ...parmacist, phone: e.target.value });
            }}
          />

          <Typography>Age</Typography>
          <TextField
            required
            id="outlined-required"
            value={parmacist.age}
            onChange={(e) => {
              setParmacist({ ...parmacist, age: e.target.value });
            }}
          />

          <Typography>Gender</Typography>
          <TextField
            required
            id="outlined-required"
            value={parmacist.gender}
            onChange={(e) => {
              setParmacist({ ...parmacist, gender: e.target.value });
            }}
          />

          <Typography>Address</Typography>
          <TextField
            required
            id="outlined-required"
            value={parmacist.address}
            onChange={(e) => {
              setParmacist({ ...parmacist, address: e.target.value });
            }}
          />

          <Button onClick={handleAddparmacist}>Add parmacist</Button>
        </Paper>
      </Box>
    </>
  );
}
