import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormControl, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Button, Box } from "@mui/material";
import useApi from "./Api";
import type { Department, Slot } from "../Types";

export default function BookAppointment() {
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    department: "",
    doctor: "",
    date: dayjs(),
    slot: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    department: false,
    doctor: false,
    date: false,
    slot: false,
  });

  const [errmessage, setErrmessage] = useState({
    name: "",
    email: "",
    department: "",
    doctor: "",
    date: "",
    slot: "",
  });

  async function getSlots() {
    const response = await useApi({
      query: `query GetSlot {
    getSlot {
        success
        message
        slots {
            slot
            id
        }
    }
}`,
    });
    console.log(response.data.data.getSlot.slots);
    return response.data.data.getSlot.slots;
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
            }
          }
        }
      `,
    });
    // console.log(response);
    return response.data.data.getDepartment.departments;
  }
  async function getPatient() {
    const response = await useApi({
      query: `
      query GetPatient {
        getPatient {
          success
          message
          patients {
            id
            users {
              name
              email
            }
          }
        }
      }
    `,
    });

    const patients = response.data.data.getPatient.patients;

    const patient = patients.filter(
      (patient: any) =>
        patient.users.name === appointment.name &&
        patient.users.email === appointment.email,
    );
    return patient[0]?.id;
  }
  async function getDoctors() {
    const response = await useApi({
      query: `
        query GetDoctor {
          getDoctor(department_id: "${appointment.department}") {
            success
            message
            doctors {
              id
              users {
                name
              }
            }
          }
        }
        `,
    });
    console.log(response.data.data.getDoctor.doctors);
    return response.data.data.getDoctor.doctors;
  }

  async function getDoctorAppointment() {
    const response = await useApi({
      query: `
      query GetDoctorAppointment {
        getDoctorAppointment(
          doctor_id: "${appointment.doctor}"
          appointment_date: "${appointment.date.format("YYYY-MM-DD")}"
        ) {
          success
          message
          slots {
            id
            slot
          }
        }
      }
    `,
    });

    console.log(response);
    return response.data.data.getDoctorAppointment.slots;
  }
  const { data: doctors } = useQuery({
    queryKey: ["depdoctors", appointment.department],
    queryFn: getDoctors,
    enabled: !!appointment.department,
  });
  const { data: slots } = useQuery({
    queryKey: ["slots"],
    queryFn: getSlots,
  });

  const { data: department } = useQuery({
    queryKey: ["department"],
    queryFn: getDepartments,
  });

  const { data: doctorBooked } = useQuery({
    queryKey: ["doctorBook", appointment.doctor, appointment.date],
    queryFn: getDoctorAppointment,
    enabled: !!appointment.doctor,
  });

  function handleAppointment() {
    if (!appointment.name) {
      setError((prev) => ({ ...prev, name: true }));
      setErrmessage((prev) => ({ ...prev, name: "Name is required" }));
    }

    if (!appointment.email) {
      setError((prev) => ({ ...prev, email: true }));
      setErrmessage((prev) => ({ ...prev, email: "Email is required" }));
    }

    if (!appointment.department) {
      setError((prev) => ({ ...prev, department: true }));
      setErrmessage((prev) => ({
        ...prev,
        department: "Department is required",
      }));
    }

    if (!appointment.doctor) {
      setError((prev) => ({ ...prev, doctor: true }));
      setErrmessage((prev) => ({
        ...prev,
        doctor: "Doctor is required",
      }));
    }

    if (!appointment.date) {
      setError((prev) => ({ ...prev, date: true }));
      setErrmessage((prev) => ({
        ...prev,
        date: "Date is required",
      }));
    }

    if (!appointment.slot) {
      setError((prev) => ({ ...prev, slot: true }));
      setErrmessage((prev) => ({
        ...prev,
        slot: "Please select a slot",
      }));
    }

    if (
      !appointment.name ||
      !appointment.email ||
      !appointment.department ||
      !appointment.doctor ||
      !appointment.date ||
      !appointment.slot
    ) {
      return;
    }

    bookAppointmentMutation.mutate();
  }
  async function bookAppointment() {
    const patientId = await getPatient();

    const response = await useApi({
      query: `
      mutation BookAppointment {
        bookAppointment(
          input: {
            patient_id: "${patientId}"
            appointment_date: "${appointment.date.toISOString()}"
            slot_id: "${appointment.slot}"
            doctor_id: "${appointment.doctor}"
          }
        ) {
          success
          message
        }
      }
    `,
    });

    return response.data.data.bookAppointment;
  }
  const bookAppointmentMutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: (data) => {
      console.log(data.message);
    },
  });

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Name</Typography>
          <TextField
            fullWidth
            value={appointment.name}
            error={error.name}
            helperText={errmessage.name}
            onChange={(e) => {
              setAppointment({ ...appointment, name: e.target.value });
              setError((prev) => ({ ...prev, name: false }));
              setErrmessage((prev) => ({ ...prev, name: "" }));
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Email</Typography>
          <TextField
            required
            fullWidth
            id="outlined-required"
            value={appointment.email}
            onChange={(e) => {
              setAppointment({ ...appointment, email: e.target.value });
              setError((prev) => ({ ...prev, erremail: false }));
              setErrmessage((prev) => ({ ...prev, erremail: "" }));
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Department</Typography>
          <FormControl fullWidth error={error.department}>
            <Select
              value={appointment.department}
              onChange={(e) => {
                setAppointment({ ...appointment, department: e.target.value });
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
            {errmessage.department}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Doctor</Typography>
          <FormControl fullWidth error={error.doctor}>
            <Select
              value={appointment.doctor}
              onChange={(e) => {
                setAppointment({ ...appointment, doctor: e.target.value });
                setError((prev) => ({ ...prev, doctor: false }));
                setErrmessage((prev) => ({ ...prev, doctor: "" }));
              }}
            >
              {doctors?.map((doctor: any) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.users.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography color="error" variant="caption">
            {errmessage.doctor}
          </Typography>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Select Date"
              disablePast
              value={appointment.date}
              onChange={(newdate) => {
                if (newdate) {
                  setAppointment({ ...appointment, date: newdate });
                }
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box sx={{ display: "flex" }}>
          {slots?.map((s: Slot) => (
            <Button
              id={s.id}
              variant="outlined"
              color={
                doctorBooked?.some((slot: Slot) => slot.id === s.id)
                  ? "error"
                  : "primary"
              }
              disabled={doctorBooked?.some((slot: Slot) => slot.id === s.id)}
              onClick={() => setAppointment({ ...appointment, slot: s.id })}
            >
              {s.slot}
            </Button>
          ))}
        </Box>

        <Button onClick={handleAppointment}>Book Appointment</Button>
      </Grid>
    </>
  );
}
