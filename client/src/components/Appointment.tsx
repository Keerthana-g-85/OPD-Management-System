import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function BookAppointment() {
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    department: "",
    doctor: "",
    date: dayjs(),
  });
  return (
    <>
      <Typography>Name</Typography>
      <TextField
        required
        id="outlined-required"
        value={appointment.name}
        onChange={(e) => {
          setAppointment({ ...appointment, name: e.target.value });
        }}
      />

      <Typography>Email</Typography>
      <TextField
        required
        id="outlined-required"
        value={appointment.email}
        onChange={(e) => {
          setAppointment({ ...appointment, email: e.target.value });
        }}
      />
      <Typography>Department</Typography>
      <TextField
        required
        id="outlined-required"
        value={appointment.department}
        onChange={(e) => {
          setAppointment({ ...appointment, department: e.target.value });
        }}
      />
      <Typography>Doctor</Typography>
      <TextField
        required
        id="outlined-required"
        value={appointment.doctor}
        onChange={(e) => {
          setAppointment({ ...appointment, doctor: e.target.value });
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select Date"
            value={appointment.date}
            onChange={(newdate) => {
              if (newdate) {
                setAppointment({ ...appointment, date: newdate });
              }
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>

    
  );
}
