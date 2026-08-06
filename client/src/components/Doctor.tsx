import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import type { Doctors } from "../Types";
import useApi from "./Api";
import { useSelector } from "react-redux";
export default function Doctors() {
  const navigate = useNavigate();
  const role = useSelector((state: any) => state.login.user?.role);
  console.log(role);
  const queryClient = useQueryClient();
  async function handleDoctors() {
    try {
      const response = await useApi({
        query: `query GetDoctor {
                    getDoctor {
                        success
                        message
                        doctors {
                            id
                            qualification
                            experience
                            charges
                            status
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
  `,
      });
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

  async function handleEdit(data: Doctors) {
    const response = await useApi({
      query: `
    mutation {
      editDoctor(
        input: {
            id : "${data.users.id}"
            status: ${!data.status}
        }
    ) {
        success
        message
    }
    }
  `,
    });
    console.log(response);

    return response;
  }
  const editDoctorMutation = useMutation({
    mutationFn: handleEdit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });
    },
  });
  return (
    <>
      {role === "admin" ? (
        <Box>
          <Button
            onClick={() => {
              navigate("/add_doctor");
            }}
          >
            ADD DOCTOR
          </Button>
        </Box>
      ) : null}
      {doctor?.map((data: Doctors) => {
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
                  <Button onClick={() => editDoctorMutation.mutate(data)}>
                    {data.status ? "Active" : "Not Active"}
                  </Button>
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
                  {role === "admin" ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate("/edit_doctor", { state: { data } });
                      }}
                    >
                      Edit
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </>
  );
}
