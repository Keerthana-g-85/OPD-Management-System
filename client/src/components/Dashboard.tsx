import request from "graphql-request";
import { ADMIN_DASHBOARD } from "../graphql/Query/ADMIN_DASHBOARD";
import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import type { WeekAppointment } from "../Types";
import Grid from "@mui/material/Grid";
export default function Dashboard() {
  async function handleDoctorsDashboard() {
    const response = await request(
      "http://localhost:3040/graphql",
      ADMIN_DASHBOARD,
      {},
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    );
    console.log(response);
    return response.adminDashboard;
  }

  const { data } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: handleDoctorsDashboard,
  });
  const weekAppointments = data?.weekAppointment ?? [];

  const days = weekAppointments.map((item: WeekAppointment) => item.day);

  const appointmentCounts = weekAppointments.map(
    (item: WeekAppointment) => item.count,
  );

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography>Total Doctors</Typography>

                <Typography variant="h3">{data?.totalDoctors}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography>Total Patients</Typography>
                <Typography variant="h3">{data?.totalPatients}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography>Total Receptionists</Typography>

                <Typography variant="h3">{data?.totalReceptionists}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography>Total Pharmacists</Typography>

                <Typography variant="h3">{data?.totalPharmacists}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography>Today's Appointments</Typography>

                <Typography variant="h3">{data?.todaysAppointments}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        <Grid size={4}>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: data?.totalDoctors,
                    label: "Doctors",
                  },
                  {
                    id: 1,
                    value: data?.totalPatients,
                    label: "Patients",
                  },
                  {
                    id: 2,
                    value: data?.totalReceptionists,
                    label: "Receptionists",
                  },
                  {
                    id: 3,
                    value: data?.totalPharmacists,
                    label: "Pharmacists",
                  },
                ],
                highlightScope: {
                  fade: "global",
                  highlight: "item",
                },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={300}
            width={300}
          />
        </Grid>

        <Grid size={8}>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: days,
              },
            ]}
            series={[
              {
                data: appointmentCounts,
                label: "Appointments",
              },
            ]}
            height={300}
            width={700}
          />
        </Grid>
      </Grid>
    </>
  );
}
