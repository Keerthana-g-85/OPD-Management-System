import { request } from "graphql-request";
import { GET_DOCTOR_APPOINMENTS } from "../../graphql/mutations/GET_DOCTOR_APPOINTMENTS";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DoctorAppointment() {
  const id = useSelector((state: any) => state.login.user?.id);
  const navigate = useNavigate();

  async function getDoctorAppointment() {
    const response = await request(
      "http://localhost:3040/graphql",
      GET_DOCTOR_APPOINMENTS,
      { id: id },
    );

    return response.getDoctorAppointment.appointment;
  }

  const { data: doctor_appointment } = useQuery({
    queryKey: ["doctor_appoinment", id],
    queryFn: getDoctorAppointment,
    enabled: !!id,
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient Name</StyledTableCell>
            <StyledTableCell align="right">Appointment Date</StyledTableCell>
            <StyledTableCell align="right">Slot</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">
              View Patient Details
            </StyledTableCell>
            <StyledTableCell align="right">Consultation</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {doctor_appointment?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.patient.users.name}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.appointment_date}
              </StyledTableCell>

              <StyledTableCell align="right">{row.slot.slot}</StyledTableCell>

              <StyledTableCell align="right">{row.status}</StyledTableCell>

              <StyledTableCell align="right">
                <Button
                  onClick={() => {
                    console.log(row.patient.id)
                    navigate("/patient", {
                      state: {
                        data: row.patient.id,
                      },
                    });
                  }}
                >
                  View
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Button
                  onClick={() => {
                    navigate("/add_consultation", {
                      state: { row },
                    });
                  }}
                >
                  Consultation
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
