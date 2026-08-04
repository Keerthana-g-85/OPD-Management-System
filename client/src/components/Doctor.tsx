import { useQuery } from "@tanstack/react-query";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import type { Doctors } from "../Types";
import useApi from "./Api"
export default function Doctors() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const Api = useApi()
  async function handleDoctors() {
    try {
      const response = await Api({query :`query GetDoctor {
                    getDoctor {
                        success
                        message
                        doctors {
                            id
                            qualification
                            experience
                            charges
                            users {
                                id
                                name
                                email
                                password
                                age
                                gender
                                address
                                phone
                                role
                                image
                            }
                            department {
                                id
                                name
                            }
                        }
                    }
                    }
  `})
      console.log(response);
      console.log(response.data.data.getDoctor.doctors);
      const data = response.data.data.getDoctor.doctors;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: doctor } = useQuery({
    queryKey: ["doctors"],
    queryFn: handleDoctors,
  });
  return (
    <>
      <Box>
        <Button onClick={()=>{navigate('/add_doctor')}}>ADD DOCTOR</Button>
      </Box>
      {doctor?.map((data : Doctors) => {
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
                    Dr. {data.users.name}
                  </Typography>
                  <hr />
                  <Typography>Email : {data.users.email}</Typography>
                  <Typography>Age : {data.users.age}</Typography>
                  <Typography>Gender : {data.users.gender}</Typography>
                  <Typography>Phone : {data.users.phone}</Typography>
                  <Typography>Qualification : {data.qualification}</Typography>
                  <Typography>Speciality : {data.department.name}</Typography>
                  <Typography>Experience : {data.experience}+ years</Typography>
                  <Typography>Consultation Charges : {data.charges}</Typography>
                  <Typography>Location : {data.users.address}</Typography>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </>
  );
}
