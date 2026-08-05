import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    department: "",
    qualification: "",
    experience: "",
    charges: "",
    image: "",
  });
  const [error, setError] = useState({
    errname: false,
    erremail: false,
    errphone: false,
    errage: false,
    errgender: false,
    erraddress: false,
    errdepartment: false,
    errqualification: false,
    errexperience: false,
    errcharges: false,
    errimage: false,
  });
  const [errmessage, setErrmessage] = useState({
    errname: "",
    erremail: "",
    errphone: "",
    errage: "",
    errgender: "",
    erraddress: "",
    errdepartment: "",
    errqualification: "",
    errexperience: "",
    errcharges: "",
    errimage: "",
  });
  const navigate = useNavigate();

  async function handleAddDoctor() {
    try {
      if (!doctor.name) {
        setError((prev) => ({ ...prev, errname: true }));
        setErrmessage((prev)=> ({...prev , errname:"Name is required"}));
      }
      else{
      const response = await axios.post("http://localhost:3040/graphql", {
        query: `
    mutation {
      addDoctor(
        input: {
            name: "${doctor.name}"
            email: "${doctor.email}"
            password: "123456"
            age: ${doctor.age}
            gender: "${doctor.gender}"
            address: "${doctor.address}"
            phone: "${doctor.phone}"
            role: doctor
            department: "${doctor.department}"
            image: "${doctor.image}"
            qualification: "${doctor.qualification}"
            experience: ${doctor.experience}
            charges: ${doctor.charges}
            status: true
        }
    ) {
        success
        message
    }
    }
  `,
      });
      console.log(response);
    }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box>
        <Paper>
          <Button
            onClick={() => {
              navigate("/doctors");
            }}
          >
            Back
          </Button>
          <Typography>Name</Typography>
          <TextField
            required
            id={error.errname ? "outlined-error" : "outlined-required"}
            value={doctor.name}
            error ={error.errname}
            helperText={errmessage.errname}
            onChange={(e) => {
              setDoctor({ ...doctor, name: e.target.value });
              setError((prev)=> ({...prev , errname: false}));
              setErrmessage((prev)=> ({...prev , errname:""}))
            }}
          />

          <Typography>Email</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.email}
            onChange={(e) => {
              setDoctor({ ...doctor, email: e.target.value });
            }}
          />

          <Typography>Phone Number</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.phone}
            onChange={(e) => {
              setDoctor({ ...doctor, phone: e.target.value });
            }}
          />

          <Typography>Age</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.age}
            onChange={(e) => {
              setDoctor({ ...doctor, age: e.target.value });
            }}
          />

          <Typography>Gender</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.gender}
            onChange={(e) => {
              setDoctor({ ...doctor, gender: e.target.value });
            }}
          />

          <Typography>Address</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.address}
            onChange={(e) => {
              setDoctor({ ...doctor, address: e.target.value });
            }}
          />

          <Typography>Speciality</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.department}
            onChange={(e) => {
              setDoctor({ ...doctor, department: e.target.value });
            }}
          />

          <Typography>Qualification</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.qualification}
            onChange={(e) => {
              setDoctor({ ...doctor, qualification: e.target.value });
            }}
          />

          <Typography>Experience</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.experience}
            onChange={(e) => {
              setDoctor({ ...doctor, experience: e.target.value });
            }}
          />

          <Typography>Consultation Charges</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.charges}
            onChange={(e) => {
              setDoctor({ ...doctor, charges: e.target.value });
            }}
          />

          <Typography>Photo</Typography>
          <TextField
            required
            id="outlined-required"
            value={doctor.image}
            onChange={(e) => {
              setDoctor({ ...doctor, image: e.target.value });
            }}
          />

          <Button onClick={handleAddDoctor}>Add Doctor</Button>
        </Paper>
      </Box>
    </>
  );
}
