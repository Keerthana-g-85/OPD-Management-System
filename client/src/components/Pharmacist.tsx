import { useQuery } from "@tanstack/react-query";
import useApi from "./Api";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import type { Pharmacist, Users } from "../Types";
export default function Pharmacist() {
  const navigate = useNavigate();
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
  return (
    <>
      <Button
        onClick={() => {
          navigate("/add_pharmacist");
        }}
      >
        ADD PHARMACIST
      </Button>
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
                  <hr />
                  <Typography>Email : {data.users.email}</Typography>
                  <Typography>Age : {data.users.age}</Typography>
                  <Typography>Gender : {data.users.gender}</Typography>
                  <Typography>Phone : {data.users.phone}</Typography>
                  <Typography>Location : {data.users.address}</Typography>
                  <Typography>Experience : {data.experience}</Typography>
                  <Typography>Qualification : {data.qualification}</Typography>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </>
  );
}
