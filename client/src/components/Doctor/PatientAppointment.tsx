import { request } from "graphql-request";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GET_PATIENT } from "../../graphql/Query/GET_PATIENT";
import { CardMedia, Grid } from "@mui/material";

export default function Patient() {
  const location = useLocation();

  const data = location.state?.data;

  const getPatient = async () => {
    const response = await request(
      "http://localhost:3040/graphql",
      GET_PATIENT,
      {
        getPatientId: data,
      },
    );

    console.log(response.getPatient.patient);

    return response.getPatient.patient;
  };

  const { data: patient } = useQuery({
    queryKey: ["each_patient", data],
    queryFn: getPatient,
    enabled: !!data,
  });

  return (
    <div>
      <Grid>
        <CardMedia
          component="img"
          alt="image not found"
          height="200px"
          width="200px"
          sx={{ p: 1, borderRadius: 5, objectFit: "cover" }}
          image={patient?.users.image}
        />
      </Grid>
      <h1>{patient?.users.name}</h1>

      <p>Email: {patient?.users?.email}</p>
      <p>Age: {patient?.users?.age}</p>
      <p>Gender: {patient?.users?.gender}</p>
      <p>Phone: {patient?.users?.phone}</p>
      <p>Location: {patient?.users?.address}</p>

      <p>Height: {patient?.height}</p>
      <p>Weight: {patient?.weight}</p>
      <p>Occupation: {patient?.occupation}</p>
      <p>Marital Status: {patient?.marital_status}</p>
      <p>Allergies: {patient?.allergies}</p>
    </div>
  );
}
