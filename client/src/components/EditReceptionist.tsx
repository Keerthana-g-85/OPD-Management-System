import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router";
import useApi from "./Api";

export default function EditReceptionist() {
  const location = useLocation();
  const data = location?.state?.data;
  console.log(data);
  const [receptionist, setReceptionist] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
    age: data.age,
    gender: data.gender,
    address: data.address,
    image: data.image,
  });
  const [error, setError] = useState({
    errname: false,
    erremail: false,
    errphone: false,
    errage: false,
    errgender: false,
    erraddress: false,
    errimage: false,
  });
  const [errmessage, setErrmessage] = useState({
    errname: "",
    erremail: "",
    errphone: "",
    errage: "",
    errgender: "",
    erraddress: "",
    errimage: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  function handleReceptionist() {
    if (!receptionist.name) {
      setError((prev) => ({ ...prev, errname: true }));
      setErrmessage((prev) => ({ ...prev, errname: "Name is required" }));
    }

    if (!receptionist.email) {
      setError((prev) => ({ ...prev, erremail: true }));
      setErrmessage((prev) => ({ ...prev, erremail: "Email is required" }));
    }

    if (!receptionist.phone) {
      setError((prev) => ({ ...prev, errphone: true }));
      setErrmessage((prev) => ({
        ...prev,
        errphone: "Phone number is required",
      }));
    }

    if (!receptionist.age) {
      setError((prev) => ({ ...prev, errage: true }));
      setErrmessage((prev) => ({ ...prev, errage: "Age is required" }));
    }

    if (!receptionist.gender) {
      setError((prev) => ({ ...prev, errgender: true }));
      setErrmessage((prev) => ({ ...prev, errgender: "Gender is required" }));
    }

    if (!receptionist.address) {
      setError((prev) => ({ ...prev, erraddress: true }));
      setErrmessage((prev) => ({
        ...prev,
        erraddress: "Address is required",
      }));
    }

    if (!receptionist.image) {
      setError((prev) => ({ ...prev, errimage: true }));
      setErrmessage((prev) => ({
        ...prev,
        errimage: "Image is required",
      }));
    }

    if (
      !receptionist.name ||
      !receptionist.email ||
      !receptionist.phone ||
      !receptionist.age ||
      !receptionist.gender ||
      !receptionist.address ||
      !receptionist.image
    ) {
      return;
    }

    addReceptionistMutation.mutate();
  }
  async function handleUpdatereceptionist() {
    const response = await useApi({
      query: `
      mutation {
        editUser(
          input: {
            id : "${data.id}"
            name: "${receptionist.name}"
            email: "${receptionist.email}"
            age: ${receptionist.age}
            password : "123456"
            gender: "${receptionist.gender}"
            address: "${receptionist.address}"
            phone: "${receptionist.phone}"
            image: "${receptionist.image}"
          }
        ) {
          success
          message
        }
      }
    `,
    });

    console.log(response);

    setReceptionist({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      address: "",
      image: "",
    });

    return response;
  }
  const addReceptionistMutation = useMutation({
    mutationFn: handleUpdatereceptionist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["receptionists"],
      });

      navigate("/receptionist");
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
            onClick={() => navigate("/receptionist")}
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
                value={receptionist.name}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, name: e.target.value });
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
                value={receptionist.email}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, email: e.target.value });
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
                value={receptionist.phone}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, phone: e.target.value });
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
                value={receptionist.age}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, age: e.target.value });
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
                value={receptionist.gender}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, gender: e.target.value });
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
                value={receptionist.address}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, address: e.target.value });
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
                value={receptionist.image}
                onChange={(e) => {
                  setReceptionist({ ...receptionist, image: e.target.value });
                  setError((prev) => ({ ...prev, errimage: false }));
                  setErrmessage((prev) => ({ ...prev, errimage: "" }));
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: "20px" }}
            onClick={handleReceptionist}
          >
            Edit Receptionist
          </Button>
        </Paper>
      </Box>
    </>
  );
}
