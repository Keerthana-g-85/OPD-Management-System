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
import { GET_PRESCRIPTION_APPOINTMENTS } from "../../graphql/Query/GET_PRESCRIPTION_APPOINTMENTS";
import { request } from "graphql-request";
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

export default function PrescriptionAppointments() {
  const navigate = useNavigate();
  async function getPrescriptionAppointments() {
    const response = await request(
      "http://localhost:3040/graphql",
      GET_PRESCRIPTION_APPOINTMENTS,
    );

    console.log(response);

    return response.getPrescriptionGeneratedAppointments.appointment;
  }

  const { data: appointments } = useQuery({
    queryKey: ["prescription_generated_appointments"],
    queryFn: getPrescriptionAppointments,
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell align="right">Doctor</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Slot</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {appointments?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.patient.users.name}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row.doctor.users.name}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row.appointment_date}
                </StyledTableCell>

                <StyledTableCell align="right">{row.slot.slot}</StyledTableCell>

                <StyledTableCell align="right">{row.status}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/prescription", {
                        state: {
                          appointmentId: row.id,
                        },
                      });
                    }}
                  >
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
