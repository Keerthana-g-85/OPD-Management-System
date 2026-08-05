import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddPatient() {
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    image: "",
    height: "",
    weight: "",
    occupation: "",
    marital_status: "",
    allergies: "",
  });
  const navigate = useNavigate();
  async function handleAddpatient() {}
  return (
    <>
      <Box>
        <Paper>
          <Button
            onClick={() => {
              navigate("/patients");
            }}
          >
            Back
          </Button>
          <Typography>Name</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.name}
            onChange={(e) => {
              setPatient({ ...patient, name: e.target.value });
            }}
          />

          <Typography>Email</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.email}
            onChange={(e) => {
              setPatient({ ...patient, email: e.target.value });
            }}
          />

          <Typography>Phone Number</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.phone}
            onChange={(e) => {
              setPatient({ ...patient, phone: e.target.value });
            }}
          />

          <Typography>Age</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.age}
            onChange={(e) => {
              setPatient({ ...patient, age: e.target.value });
            }}
          />

          <Typography>Gender</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.gender}
            onChange={(e) => {
              setPatient({ ...patient, gender: e.target.value });
            }}
          />

          <Typography>Address</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.address}
            onChange={(e) => {
              setPatient({ ...patient, address: e.target.value });
            }}
          />

          <Typography>Height</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.height}
            onChange={(e) => {
              setPatient({ ...patient, height: e.target.value });
            }}
          />

          <Typography>Weight</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.weight}
            onChange={(e) => {
              setPatient({ ...patient, weight: e.target.value });
            }}
          />

          <Typography>Occupation</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.occupation}
            onChange={(e) => {
              setPatient({ ...patient, occupation: e.target.value });
            }}
          />

          <Typography>Consultation Charges</Typography>

          <Typography>Photo</Typography>
          <TextField
            required
            id="outlined-required"
            value={patient.image}
            onChange={(e) => {
              setPatient({ ...patient, image: e.target.value });
            }}
          />
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-outlined-label">Marital Status</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={patient.marital_status}
              onChange={(e) => {
              setPatient({ ...patient,marital_status: e.target.value });
            }}
              label="Marital Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-outlined-label">Allergy</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={patient.allergies}
              onChange={(e) => {
              setPatient({ ...patient,allergies: e.target.value });
            }}
              label="Allegry"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>

          <Button onClick={handleAddpatient}>Add patient</Button>
        </Paper>
      </Box>
    </>
  );
}
