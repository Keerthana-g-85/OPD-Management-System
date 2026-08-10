import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./Api";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Users } from "../Types";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function Receptionist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const role = useSelector((state: any) => state.login.user?.role);
  async function getReceptionists() {
    try {
      const response = await useApi({
        query: `query GetUser {
  getUser(role: receptionists) {
        success
        message
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
            status 
            createdAt
            updatedAt
        }
    }
}
  `,
      });
      console.log(response);
      console.log(response.data.data.getUser.users);
      const data = response.data.data.getUser.users;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: receptionists } = useQuery({
    queryKey: ["receptionists"],
    queryFn: getReceptionists,
  });

  async function handleEdit(data: Users) {
    const response = await useApi({
      query: `
    mutation {
      editPharmacist(
        input: {
            id : "${data.id}"
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

  const editReceptionistMutation = useMutation({
    mutationFn: handleEdit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["receptionists"],
      });
    },
  });
  return (
    <>
      {role === "admin" ? (
        <Button
          onClick={() => {
            navigate("/add_receptionist");
          }}
        >
          ADD RECEPTIONIST
        </Button>
      ) : null}
      {receptionists?.map((data: Users) => {
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
                    image={data.image}
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
                    {data.name}
                  </Typography>
                  <Button onClick={() => editReceptionistMutation.mutate(data)}>
                    {data.status ? "Active" : "Not Active"}
                  </Button>
                  <hr />
                  <Typography>Email : {data.email}</Typography>
                  <Typography>Age : {data.age}</Typography>
                  <Typography>Gender : {data.gender}</Typography>
                  <Typography>Phone : {data.phone}</Typography>
                  <Typography>Location : {data.address}</Typography>
                  {role === "admin" ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate("/edit_receptionist", { state: { data } });
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
