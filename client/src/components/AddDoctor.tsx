import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField";

export default function AddDoctor() {

    function handleAddDoctor (){

    }
  return (
    <>
      <Box>
        <Paper>
          <Typography>Name</Typography>
          <TextField required id="outlined-required" />

          <Typography>Email</Typography>
          <TextField required id="outlined-required" />

          <Typography>Phone Number</Typography>
          <TextField required id="outlined-required" />

          <Typography>Age</Typography>
          <TextField required id="outlined-required" />

          <Typography>Gender</Typography>
          <TextField required id="outlined-required" />

          <Typography>Address</Typography>
          <TextField required id="outlined-required" />

          <Typography>Speciality</Typography>
          <TextField required id="outlined-required" />

          <Typography>Qualification</Typography>
          <TextField required id="outlined-required" />

          <Typography>Experience</Typography>
          <TextField required id="outlined-required" />

          <Typography>Consultation Charges</Typography>
          <TextField required id="outlined-required" />

          <Button onClick={handleAddDoctor}>Add Doctor</Button>

        </Paper>
      </Box>
    </>
  );
}
