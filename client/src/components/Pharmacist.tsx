import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import type { Users } from "../Types";
export default function Pharmacist() {
  const navigate = useNavigate();
  async function getPharmacist() {
    try {
      const response = await axios.post("http://localhost:3040/graphql", {
        query: `query Query {
  getPharmacist {
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
    }
  }
}
  `,
      });
      console.log(response);
      console.log(response.data.data.getPharmacist.users);
      const data = response.data.data.getPharmacist.users;
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
      {parmacist?.map((data : Users) => {
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
                  <hr />
                  <Typography>Email : {data.email}</Typography>
                  <Typography>Age : {data.age}</Typography>
                  <Typography>Gender : {data.gender}</Typography>
                  <Typography>Phone : {data.phone}</Typography>
                  <Typography>Location : {data.address}</Typography>
                </Grid>
              </Grid>
            </Card>
          </div>
        );
      })}
    </>
  );
}
