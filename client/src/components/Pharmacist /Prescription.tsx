import { request } from "graphql-request";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GET_PRESCRIPTIONS } from "../../graphql/Query/GET_PRESCRIPTION";
import type { Prescription } from "../../Types";

export default function Prescription() {
  const location = useLocation();

  const appointmentId = location.state?.appointmentId;

  async function getPrescriptions() {
    const response = await request(
      "http://localhost:3040/graphql",
      GET_PRESCRIPTIONS,
      {
        appointmentId: appointmentId,
      },
    );

    console.log(response);

    return response.getPrescriptions.prescriptions;
  }

  const { data: prescriptions } = useQuery({
    queryKey: ["prescriptions", appointmentId],
    queryFn: getPrescriptions,
    enabled: !!appointmentId,
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Medicine</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {prescriptions?.map((data: Prescription) => (
            <TableRow key={data.id}>
              <TableCell>{data.name}</TableCell>

              <TableCell>{data.dosage}</TableCell>

              <TableCell>{data.frequency}</TableCell>

              <TableCell>{data.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
