import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./Api";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import type { Pharmacist } from "../Types";
import { useSelector } from "react-redux";
export default function Pharmacist() {
  const navigate = useNavigate();
  const role = useSelector((state: any) => state.login.user?.role);
  const queryClient = useQueryClient();
  async function getPharmacist() {
    try {
      const response = await useApi({
        query: `query GetPharmacist {
    getPharmacist {
        success
        message
        pharmacists {
            id
            qualification
            experience
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
                status
                createdAt
                updatedAt
            }
        }
    }
}

  `,
      });
      console.log(response);
      console.log(response.data.data.getPharmacist.pharmacists);
      const data = response.data.data.getPharmacist.pharmacists;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: parmacist } = useQuery({
    queryKey: ["parmacist"],
    queryFn: getPharmacist,
  });

  async function handleEdit(data: Pharmacist) {
    const response = await useApi({
      query: `
    mutation {
      editPharmacist(
        input: {
            id : "${data.users.id}"
            status: ${!data.users.status}
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

  const editPharmacistMutation = useMutation({
    mutationFn: handleEdit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["parmacist"],
      });
    },
  });
  return (
    <>
      {role === "admin" ? (
        <Button
          onClick={() => {
            navigate("/add_pharmacist");
          }}
        >
          ADD PHARMACIST
        </Button>
      ) : null}
      {parmacist?.map((data: Pharmacist) => {
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
                  <Button onClick={() => editPharmacistMutation.mutate(data)}>
                    {data.users.status ? "Active" : "Not Active"}
                  </Button>
                  <hr />
                  <Typography>Email : {data.users.email}</Typography>
                  <Typography>Age : {data.users.age}</Typography>
                  <Typography>Gender : {data.users.gender}</Typography>
                  <Typography>Phone : {data.users.phone}</Typography>
                  <Typography>Location : {data.users.address}</Typography>
                  <Typography>Experience : {data.experience}</Typography>
                  <Typography>Qualification : {data.qualification}</Typography>
                  {role === "admin" ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate("/edit_pharmasist", { state: { data } });
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
