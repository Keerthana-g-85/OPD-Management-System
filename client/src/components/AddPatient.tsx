import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./Api";

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
  const [error, setError] = useState({
    errname: false,
    erremail: false,
    errphone: false,
    errage: false,
    errgender: false,
    erraddress: false,
    errimage: false,
    errheight: false,
    errweight: false,
    erroccupation: false,
    errmarital_status: false,
    errallergies: false,
  });

  const [errmessage, setErrmessage] = useState({
    errname: "",
    erremail: "",
    errphone: "",
    errage: "",
    errgender: "",
    erraddress: "",
    errimage: "",
    errheight: "",
    errweight: "",
    erroccupation: "",
    errmarital_status: "",
    errallergies: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  async function handlePatient() {
    if (!patient.name) {
      setError((prev) => ({ ...prev, errname: true }));
      setErrmessage((prev) => ({ ...prev, errname: "Name is required" }));
    }

    if (!patient.email) {
      setError((prev) => ({ ...prev, erremail: true }));
      setErrmessage((prev) => ({ ...prev, erremail: "Email is required" }));
    }

    if (!patient.phone) {
      setError((prev) => ({ ...prev, errphone: true }));
      setErrmessage((prev) => ({
        ...prev,
        errphone: "Phone number is required",
      }));
    }

    if (!patient.age) {
      setError((prev) => ({ ...prev, errage: true }));
      setErrmessage((prev) => ({ ...prev, errage: "Age is required" }));
    }

    if (!patient.gender) {
      setError((prev) => ({ ...prev, errgender: true }));
      setErrmessage((prev) => ({ ...prev, errgender: "Gender is required" }));
    }

    if (!patient.address) {
      setError((prev) => ({ ...prev, erraddress: true }));
      setErrmessage((prev) => ({
        ...prev,
        erraddress: "Address is required",
      }));
    }

    if (!patient.image) {
      setError((prev) => ({ ...prev, errimage: true }));
      setErrmessage((prev) => ({ ...prev, errimage: "Image is required" }));
    }

    if (!patient.height) {
      setError((prev) => ({ ...prev, errheight: true }));
      setErrmessage((prev) => ({ ...prev, errheight: "Height is required" }));
    }

    if (!patient.weight) {
      setError((prev) => ({ ...prev, errweight: true }));
      setErrmessage((prev) => ({ ...prev, errweight: "Weight is required" }));
    }

    if (!patient.occupation) {
      setError((prev) => ({ ...prev, erroccupation: true }));
      setErrmessage((prev) => ({
        ...prev,
        erroccupation: "Occupation is required",
      }));
    }

    if (!patient.marital_status) {
      setError((prev) => ({ ...prev, errmarital_status: true }));
      setErrmessage((prev) => ({
        ...prev,
        errmarital_status: "Marital status is required",
      }));
    }

    if (!patient.allergies) {
      setError((prev) => ({ ...prev, errallergies: true }));
      setErrmessage((prev) => ({
        ...prev,
        errallergies: "Allergies field is required",
      }));
    }

    if (
      !patient.name ||
      !patient.email ||
      !patient.phone ||
      !patient.age ||
      !patient.gender ||
      !patient.address ||
      !patient.image ||
      !patient.height ||
      !patient.weight ||
      !patient.occupation ||
      !patient.marital_status ||
      !patient.allergies
    ) {
      return;
    } else {
      addPatientMutation.mutate();
    }
  }
  async function handleAddpatient() {
    const response = await useApi({
      query: `
      mutation {
        addPatient(
          input: {
      name: "${patient.name}"
      email: "${patient.email}"
      password: "123456"
      age: ${patient.age}
      gender: "${patient.gender}"
      address: "${patient.address}"
      phone: "${patient.phone}"
      role: patient
      image: "${patient.image}"
      height: "${patient.height}"
      weight: "${patient.weight}"
      marital_status: "${patient.marital_status}"
      occupation: "${patient.occupation}"
      allergies: "${patient.allergies}"
    }
        ) {
          success
          message
        }
      }
    `,
    });

    console.log(response);

    setPatient({
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

    return response;
  }

  const addPatientMutation = useMutation({
    mutationFn: handleAddpatient,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      navigate("/patients");
    },
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: 900,
            p: 4,
            borderRadius: 3,
            mt: "50px",
          }}
        >
          <Button
            variant="contained"
            sx={{ mb: "20px" }}
            onClick={() => navigate("/patients")}
          >
            Back
          </Button>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Name</Typography>
              <TextField
                fullWidth
                error={error.errname}
                helperText={errmessage.errname}
                value={patient.name}
                onChange={(e) => {
                  setPatient({ ...patient, name: e.target.value });
                  setError((prev) => ({ ...prev, errname: false }));
                  setErrmessage((prev) => ({ ...prev, errname: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Email</Typography>
              <TextField
                fullWidth
                error={error.erremail}
                helperText={errmessage.erremail}
                value={patient.email}
                onChange={(e) => {
                  setPatient({ ...patient, email: e.target.value });
                  setError((prev) => ({ ...prev, erremail: false }));
                  setErrmessage((prev) => ({ ...prev, erremail: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Phone Number</Typography>
              <TextField
                fullWidth
                error={error.errphone}
                helperText={errmessage.errphone}
                value={patient.phone}
                onChange={(e) => {
                  setPatient({ ...patient, phone: e.target.value });
                  setError((prev) => ({ ...prev, errphone: false }));
                  setErrmessage((prev) => ({ ...prev, errphone: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Age</Typography>
              <TextField
                fullWidth
                error={error.errage}
                helperText={errmessage.errage}
                value={patient.age}
                onChange={(e) => {
                  setPatient({ ...patient, age: e.target.value });
                  setError((prev) => ({ ...prev, errage: false }));
                  setErrmessage((prev) => ({ ...prev, errage: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Gender</Typography>
              <TextField
                fullWidth
                error={error.errgender}
                helperText={errmessage.errgender}
                value={patient.gender}
                onChange={(e) => {
                  setPatient({ ...patient, gender: e.target.value });
                  setError((prev) => ({ ...prev, errgender: false }));
                  setErrmessage((prev) => ({ ...prev, errgender: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Address</Typography>
              <TextField
                fullWidth
                error={error.erraddress}
                helperText={errmessage.erraddress}
                value={patient.address}
                onChange={(e) => {
                  setPatient({ ...patient, address: e.target.value });
                  setError((prev) => ({ ...prev, erraddress: false }));
                  setErrmessage((prev) => ({ ...prev, erraddress: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Height</Typography>
              <TextField
                fullWidth
                error={error.errheight}
                helperText={errmessage.errheight}
                value={patient.height}
                onChange={(e) => {
                  setPatient({ ...patient, height: e.target.value });
                  setError((prev) => ({ ...prev, errheight: false }));
                  setErrmessage((prev) => ({ ...prev, errheight: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Weight</Typography>
              <TextField
                fullWidth
                error={error.errweight}
                helperText={errmessage.errweight}
                value={patient.weight}
                onChange={(e) => {
                  setPatient({ ...patient, weight: e.target.value });
                  setError((prev) => ({ ...prev, errweight: false }));
                  setErrmessage((prev) => ({ ...prev, errweight: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Occupation</Typography>
              <TextField
                fullWidth
                error={error.erroccupation}
                helperText={errmessage.erroccupation}
                value={patient.occupation}
                onChange={(e) => {
                  setPatient({ ...patient, occupation: e.target.value });
                  setError((prev) => ({ ...prev, erroccupation: false }));
                  setErrmessage((prev) => ({ ...prev, erroccupation: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Photo</Typography>
              <TextField
                fullWidth
                error={error.errimage}
                helperText={errmessage.errimage}
                value={patient.image}
                onChange={(e) => {
                  setPatient({ ...patient, image: e.target.value });
                  setError((prev) => ({ ...prev, errimage: false }));
                  setErrmessage((prev) => ({ ...prev, errimage: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Marital Status</Typography>

              <FormControl fullWidth error={error.errmarital_status}>
                <Select
                  value={patient.marital_status}
                  onChange={(e) => {
                    setPatient({
                      ...patient,
                      marital_status: e.target.value,
                    });
                    setError((prev) => ({
                      ...prev,
                      errmarital_status: false,
                    }));
                    setErrmessage((prev) => ({
                      ...prev,
                      errmarital_status: "",
                    }));
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="true">Married</MenuItem>
                  <MenuItem value="false">Unmarried</MenuItem>
                </Select>
              </FormControl>

              <Typography color="error" variant="caption">
                {errmessage.errmarital_status}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Allergies</Typography>

              <FormControl fullWidth error={error.errallergies}>
                <Select
                  value={patient.allergies}
                  onChange={(e) => {
                    setPatient({
                      ...patient,
                      allergies: e.target.value,
                    });
                    setError((prev) => ({
                      ...prev,
                      errallergies: false,
                    }));
                    setErrmessage((prev) => ({
                      ...prev,
                      errallergies: "",
                    }));
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>

              <Typography color="error" variant="caption">
                {errmessage.errallergies}
              </Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: "20px" }}
            onClick={handlePatient}
          >
            Add Patient
          </Button>
        </Paper>
      </Box>
    </>
  );
}
