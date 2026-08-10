import { gql } from "graphql-request";

export const ADMIN_DASHBOARD = gql`
  query AdminDashboard {
    adminDashboard {
      totalDoctors
      totalReceptionists
      totalPharmacists
      totalPatients
      todaysAppointments
      weekAppointment {
        day
        count
      }
    }
  }
`;
