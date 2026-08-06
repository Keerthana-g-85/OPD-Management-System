import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import useApi from "./Api";
import type { Department } from "../Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function UpdateDoctor() {
  const location = useLocation();
  const data = location?.state?.data;
  console.log(data)
  const [doctor, setDoctor] = useState({
    name: data.users.name ,
    email: data.users.email,
    phone: data.users.phone,
    age: data.users.age,
    gender: data.users.gender,
    address: data.users.address,
    department: data.department.id,
    qualification: data.qualification,
    experience: data.experience,
    charges: data.charges,
    image: data.users.image,
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
  const queryClient = useQueryClient();

  async function handleDoctor() {
    if (!doctor.name) {
      setError((prev) => ({ ...prev, errname: true }));
      setErrmessage((prev) => ({ ...prev, errname: "Name is required" }));
    }

    if (!doctor.email) {
      setError((prev) => ({ ...prev, erremail: true }));
      setErrmessage((prev) => ({ ...prev, erremail: "Email is required" }));
    }

    if (!doctor.phone) {
      setError((prev) => ({ ...prev, errphone: true }));
      setErrmessage((prev) => ({
        ...prev,
        errphone: "Phone number is required",
      }));
    }

    if (!doctor.age) {
      setError((prev) => ({ ...prev, errage: true }));
      setErrmessage((prev) => ({ ...prev, errage: "Age is required" }));
    }

    if (!doctor.gender) {
      setError((prev) => ({ ...prev, errgender: true }));
      setErrmessage((prev) => ({ ...prev, errgender: "Gender is required" }));
    }

    if (!doctor.address) {
      setError((prev) => ({ ...prev, erraddress: true }));
      setErrmessage((prev) => ({
        ...prev,
        erraddress: "Address is required",
      }));
    }

    if (!doctor.department) {
      setError((prev) => ({ ...prev, errdepartment: true }));
      setErrmessage((prev) => ({
        ...prev,
        errdepartment: "Department is required",
      }));
    }

    if (!doctor.qualification) {
      setError((prev) => ({ ...prev, errqualification: true }));
      setErrmessage((prev) => ({
        ...prev,
        errqualification: "Qualification is required",
      }));
    }

    if (!doctor.experience) {
      setError((prev) => ({ ...prev, errexperience: true }));
      setErrmessage((prev) => ({
        ...prev,
        errexperience: "Experience is required",
      }));
    }

    if (!doctor.charges) {
      setError((prev) => ({ ...prev, errcharges: true }));
      setErrmessage((prev) => ({
        ...prev,
        errcharges: "Charges are required",
      }));
    }

    if (!doctor.image) {
      setError((prev) => ({ ...prev, errimage: true }));
      setErrmessage((prev) => ({
        ...prev,
        errimage: "Image is required",
      }));
    }

    if (
      !doctor.name ||
      !doctor.email ||
      !doctor.phone ||
      !doctor.age ||
      !doctor.gender ||
      !doctor.address ||
      !doctor.department ||
      !doctor.qualification ||
      !doctor.experience ||
      !doctor.charges ||
      !doctor.image
    ) {
      return;
    } else {
      editDoctorMutation.mutate();
    }
  }

  async function handleAddDoctor() {
    try {
      const response = await useApi({
        query: `
    mutation {
      editDoctor(
        input: {
            id : "${data.users.id}"
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
      setDoctor({
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
    } catch (error) {
      console.log(error);
    }
  }

  async function getDepartments() {
    const response = await useApi({
      query: `
      query GetDepartment {
        getDepartment {
          success
          message
          departments {
            id
            name
            status
            createdAt
            updatedAt
          }
        }
      }
    `,
    });
    // console.log(response);
    return response.data.data.getDepartment.departments;
  }

  const { data: department } = useQuery({
    queryKey: ["department"],
    queryFn: getDepartments,
  });

  const editDoctorMutation = useMutation({
    mutationFn: handleAddDoctor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });
      navigate("/doctors");
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
            onClick={() => {
              navigate("/doctors");
            }}
            variant="contained"
            sx={{ mb: "20px" }}
          >
            Back
          </Button>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Name</Typography>
              <TextField
                required
                fullWidth
                id={error.errname ? "outlined-error" : "outlined-required"}
                value={doctor.name}
                error={error.errname}
                helperText={errmessage.errname}
                onChange={(e) => {
                  setDoctor({ ...doctor, name: e.target.value });
                  setError((prev) => ({ ...prev, errname: false }));
                  setErrmessage((prev) => ({ ...prev, errname: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Email</Typography>
              <TextField
                required
                fullWidth
                id={error.erremail ? "outlined-error" : "outlined-required"}
                value={doctor.email}
                error={error.erremail}
                helperText={errmessage.erremail}
                onChange={(e) => {
                  setDoctor({ ...doctor, email: e.target.value });
                  setError((prev) => ({ ...prev, erremail: false }));
                  setErrmessage((prev) => ({ ...prev, erremail: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Phone Number</Typography>
              <TextField
                fullWidth
                required
                id={error.errphone ? "outlined-error" : "outlined-required"}
                value={doctor.phone}
                error={error.errphone}
                helperText={errmessage.errphone}
                onChange={(e) => {
                  setDoctor({ ...doctor, phone: e.target.value });
                  setError((prev) => ({ ...prev, errphone: false }));
                  setErrmessage((prev) => ({ ...prev, errphone: "" }));
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Age</Typography>
              <TextField
                fullWidth
                required
                id={error.errage ? "outlined-error" : "outlined-required"}
                value={doctor.age}
                error={error.errage}
                helperText={errmessage.errage}
                onChange={(e) => {
                  setDoctor({ ...doctor, age: e.target.value });
                  setError((prev) => ({ ...prev, errage: false }));
                  setErrmessage((prev) => ({ ...prev, errage: "" }));
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Gender</Typography>
              <TextField
                required
                fullWidth
                id={error.errgender ? "outlined-error" : "outlined-required"}
                value={doctor.gender}
                error={error.errgender}
                helperText={errmessage.errgender}
                onChange={(e) => {
                  setDoctor({ ...doctor, gender: e.target.value });
                  setError((prev) => ({ ...prev, errgender: false }));
                  setErrmessage((prev) => ({ ...prev, errgender: "" }));
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Address</Typography>
              <TextField
                required
                fullWidth
                id={error.erraddress ? "outlined-error" : "outlined-required"}
                value={doctor.address}
                error={error.erraddress}
                helperText={errmessage.erraddress}
                onChange={(e) => {
                  setDoctor({ ...doctor, address: e.target.value });
                  setError((prev) => ({ ...prev, erraddress: false }));
                  setErrmessage((prev) => ({ ...prev, erraddress: "" }));
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Department</Typography>
              <FormControl fullWidth error={error.errdepartment}>
                <Select
                  value={doctor.department}
                  onChange={(e) => {
                    setDoctor({ ...doctor, department: e.target.value });
                    setError((prev) => ({ ...prev, errdepartment: false }));
                    setErrmessage((prev) => ({ ...prev, errdepartment: "" }));
                  }}
                >
                  {department?.map((department: Department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography color="error" variant="caption">
                {errmessage.errdepartment}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Qualification</Typography>
              <TextField
                required
                fullWidth
                id={
                  error.errqualification
                    ? "outlined-error"
                    : "outlined-required"
                }
                value={doctor.qualification}
                error={error.errqualification}
                helperText={errmessage.errqualification}
                onChange={(e) => {
                  setDoctor({ ...doctor, qualification: e.target.value });
                  setError((prev) => ({ ...prev, errqualification: false }));
                  setErrmessage((prev) => ({ ...prev, errqualification: "" }));
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Experience</Typography>
              <TextField
                required
                fullWidth
                id={
                  error.errexperience ? "outlined-error" : "outlined-required"
                }
                value={doctor.experience}
                error={error.errexperience}
                helperText={errmessage.errexperience}
                onChange={(e) => {
                  setDoctor({ ...doctor, experience: e.target.value });
                  setError((prev) => ({ ...prev, errexperience: false }));
                  setErrmessage((prev) => ({ ...prev, errexperience: "" }));
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Consultation Charges</Typography>
              <TextField
                required
                fullWidth
                id={error.errcharges ? "outlined-error" : "outlined-required"}
                value={doctor.charges}
                error={error.errcharges}
                helperText={errmessage.errcharges}
                onChange={(e) => {
                  setDoctor({ ...doctor, charges: e.target.value });
                  setError((prev) => ({ ...prev, errcharges: false }));
                  setErrmessage((prev) => ({ ...prev, errcharges: "" }));
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Photo</Typography>
              <TextField
                required
                fullWidth
                id={error.errimage ? "outlined-error" : "outlined-required"}
                value={doctor.image}
                error={error.errimage}
                helperText={errmessage.errimage}
                onChange={(e) => {
                  setDoctor({ ...doctor, image: e.target.value });
                  setError((prev) => ({ ...prev, errimage: false }));
                  setErrmessage((prev) => ({ ...prev, errimage: "" }));
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: "15px" }}
            onClick={handleDoctor}
          >
            Edit Doctor
          </Button>
        </Paper>
      </Box>
    </>
  );
}
