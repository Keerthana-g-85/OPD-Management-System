import { useQuery } from "@tanstack/react-query";
import useApi from "./Api";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Users } from "../Types";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function Receptionist() {
  const navigate = useNavigate();
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
