import { useQuery } from "@tanstack/react-query";
import useApi from "./Api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Appointment() {
  async function getAppointment() {
    const response = await useApi({
      query: `{
         getAppointment {
        success
        message
        appointment {
            id
            appointment_date
            slot {
                id
                slot
            }
            patient {
                id
                users {
                    id
                    name
                    email
                    phone
                }
            }
            status
            doctor {
                id
                charges
                users {
                    id
                    name
                    email
                }
            }
        }
    }}`,
    });
    console.log(response.data.data.getAppointment.appointment);
    return response.data.data.getAppointment.appointment;
  }

  const { data: appoints } = useQuery({
    queryKey: ["appoints"],
    queryFn: getAppointment,
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell align="right">Patient Phone</StyledTableCell>
              <StyledTableCell align="right">Doctor</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Slot</StyledTableCell>
              <StyledTableCell align="right">Fees</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appoints?.map((row : any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.patient.users.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.patient.users.phone}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.doctor.users.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.appointment_date}
                </StyledTableCell>
                <StyledTableCell align="right">{row.slot.slot}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.doctor.charges}
                </StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
