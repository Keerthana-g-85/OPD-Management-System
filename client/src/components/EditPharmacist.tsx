import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useApi from "./Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
export default function EditParmacist() {
  const location = useLocation();
  const data = location?.state?.data;
  console.log(data);
  const [parmacist, setParmacist] = useState({
    name: data.users.name,
    email: data.users.email,
    phone: data.users.phone,
    age: data.users.age,
    gender: data.users.gender,
    address: data.users.address,
    qualification: data.qualification,
    experience: data.experience,
    image: data.users.image,
  });
  const [error, setError] = useState({
    errname: false,
    erremail: false,
    errphone: false,
    errage: false,
    errgender: false,
    erraddress: false,
    errimage: false,
    errqualification: false,
    errexperience: false,
  });
  const [errmessage, setErrmessage] = useState({
    errname: "",
    erremail: "",
    errphone: "",
    errage: "",
    errgender: "",
    erraddress: "",
    errimage: "",
    errqualification: "",
    errexperience: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  function handlePharmacist() {
    if (!parmacist.name) {
      setError((prev) => ({ ...prev, errname: true }));
      setErrmessage((prev) => ({ ...prev, errname: "Name is required" }));
    }

    if (!parmacist.email) {
      setError((prev) => ({ ...prev, erremail: true }));
      setErrmessage((prev) => ({ ...prev, erremail: "Email is required" }));
    }

    if (!parmacist.phone) {
      setError((prev) => ({ ...prev, errphone: true }));
      setErrmessage((prev) => ({
        ...prev,
        errphone: "Phone number is required",
      }));
    }

    if (!parmacist.age) {
      setError((prev) => ({ ...prev, errage: true }));
      setErrmessage((prev) => ({ ...prev, errage: "Age is required" }));
    }

    if (!parmacist.gender) {
      setError((prev) => ({ ...prev, errgender: true }));
      setErrmessage((prev) => ({ ...prev, errgender: "Gender is required" }));
    }

    if (!parmacist.address) {
      setError((prev) => ({ ...prev, erraddress: true }));
      setErrmessage((prev) => ({
        ...prev,
        erraddress: "Address is required",
      }));
    }

    if (!parmacist.image) {
      setError((prev) => ({ ...prev, errimage: true }));
      setErrmessage((prev) => ({ ...prev, errimage: "Image is required" }));
    }

    if (!parmacist.qualification) {
      setError((prev) => ({ ...prev, errqualification: true }));
      setErrmessage((prev) => ({
        ...prev,
        errqualification: "Qualification is required",
      }));
    }

    if (!parmacist.experience) {
      setError((prev) => ({ ...prev, errexperience: true }));
      setErrmessage((prev) => ({
        ...prev,
        errexperience: "Experience is required",
      }));
    }

    if (
      !parmacist.name ||
      !parmacist.email ||
      !parmacist.phone ||
      !parmacist.age ||
      !parmacist.gender ||
      !parmacist.address ||
      !parmacist.image ||
      !parmacist.qualification ||
      !parmacist.experience
    ) {
      return;
    } else {
      addPharmacistMutation.mutate();
    }
  }

  async function handleEditparmacist() {
    const response = await useApi({
      query: `
      mutation {
        editPharmacist(
          input: {
            id:"${data.users.id}"
            name: "${parmacist.name}"
            email: "${parmacist.email}"
            password: "123456"
            age: ${parmacist.age}
            gender: "${parmacist.gender}"
            address: "${parmacist.address}"
            phone: "${parmacist.phone}"
            role: pharmacists
            image: "${parmacist.image}"
            qualification: "${parmacist.qualification}"
            experience: ${parmacist.experience}
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

    setParmacist({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      address: "",
      image: "",
      qualification: "",
      experience: "",
    });

    return response;
  }
  const addPharmacistMutation = useMutation({
    mutationFn: handleEditparmacist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["pharmacists"],
      });

      navigate("/pharmacist");
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
            onClick={() => navigate("/pharmacist")}
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
                value={parmacist.name}
                onChange={(e) => {
                  setParmacist({ ...parmacist, name: e.target.value });
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
                value={parmacist.email}
                onChange={(e) => {
                  setParmacist({ ...parmacist, email: e.target.value });
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
                value={parmacist.phone}
                onChange={(e) => {
                  setParmacist({ ...parmacist, phone: e.target.value });
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
                value={parmacist.age}
                onChange={(e) => {
                  setParmacist({ ...parmacist, age: e.target.value });
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
                value={parmacist.gender}
                onChange={(e) => {
                  setParmacist({ ...parmacist, gender: e.target.value });
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
                value={parmacist.address}
                onChange={(e) => {
                  setParmacist({ ...parmacist, address: e.target.value });
                  setError((prev) => ({ ...prev, erraddress: false }));
                  setErrmessage((prev) => ({ ...prev, erraddress: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Photo</Typography>
              <TextField
                fullWidth
                error={error.errimage}
                helperText={errmessage.errimage}
                value={parmacist.image}
                onChange={(e) => {
                  setParmacist({ ...parmacist, image: e.target.value });
                  setError((prev) => ({ ...prev, errimage: false }));
                  setErrmessage((prev) => ({ ...prev, errimage: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Qualification</Typography>
              <TextField
                fullWidth
                error={error.errqualification}
                helperText={errmessage.errqualification}
                value={parmacist.qualification}
                onChange={(e) => {
                  setParmacist({
                    ...parmacist,
                    qualification: e.target.value,
                  });
                  setError((prev) => ({
                    ...prev,
                    errqualification: false,
                  }));
                  setErrmessage((prev) => ({
                    ...prev,
                    errqualification: "",
                  }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Experience</Typography>
              <TextField
                fullWidth
                error={error.errexperience}
                helperText={errmessage.errexperience}
                value={parmacist.experience}
                onChange={(e) => {
                  setParmacist({
                    ...parmacist,
                    experience: e.target.value,
                  });
                  setError((prev) => ({
                    ...prev,
                    errexperience: false,
                  }));
                  setErrmessage((prev) => ({
                    ...prev,
                    errexperience: "",
                  }));
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: "20px" }}
            onClick={handlePharmacist}
          >
            Edit Pharmacist
          </Button>
        </Paper>
      </Box>
    </>
  );
}
