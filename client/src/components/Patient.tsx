import { useQuery } from "@tanstack/react-query";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import type { Patient } from "../Types";
import useApi from "./Api";
import { useSelector } from "react-redux";

export default function Patients() {
  const navigate = useNavigate();
  const role = useSelector((state: any) => state.login.user?.role);
  // const queryClient = useQueryClient();

  async function handlePatient() {
    try {
      const response = await useApi({
        query: `query GetPatient {
    getPatient {
        success
        message
        patients {
            id
            height
            weight
            marital_status
            occupation
            allergies
            users {
                id
                name
                email
                age
                gender
                address
                phone
                role
                image
                createdAt
                updatedAt
            }
        }
    }
}

  `,
      });
      console.log(response);
      console.log(response.data.data.getPatient.patients);
      const data = response.data.data.getPatient.patients;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: patient } = useQuery({
    queryKey: ["patients"],
    queryFn: handlePatient,
  });
  return (
    <>
      {role === "receptionist" ? (
        <Box>
          <Button
            onClick={() => {
              navigate("/add_patient");
            }}
          >
            ADD PATIENT
          </Button>
        </Box>
      ) : null}

      {patient?.map((data: Patient) => {
        return (
          <div key={data.id}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={3}>
                <Grid>
                  <CardMedia
                    component="img"
                    alt="image not found"
                    height="200px"
                    width="200px"
                    sx={{ p: 1, borderRadius: 5, objectFit: "cover" }}
                    image={data.users.image}
                  />
                </Grid>

                <Grid>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "600",
                      fontSize: "42px",
                      color: "#325E6A",
                    }}
                  >
                    {data.users.name}
                  </Typography>
                  <hr />
                  <Typography>Email : {data.users.email}</Typography>
                  <Typography>Age : {data.users.age}</Typography>
                  <Typography>Gender : {data.users.gender}</Typography>
                  <Typography>Phone : {data.users.phone}</Typography>
                  <Typography>Location : {data.users.address}</Typography>
                  <Typography>Height : {data.height}</Typography>
                  <Typography>Weigth : {data.weight}</Typography>
                  <Typography>Occupation : {data.occupation}</Typography>
                  <Typography>
                    Martial Status : {data.marital_status}
                  </Typography>
                  <Typography>Allergies : {data.allergies}</Typography>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </>
  );
}
