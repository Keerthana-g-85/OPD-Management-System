import { gql } from "graphql-request";

export const GET_PRESCRIPTION_APPOINTMENTS = gql`
  query GetPrescriptionGeneratedAppointments {
    getPrescriptionGeneratedAppointments {
      success
      message
      appointment {
        id
        appointment_date
        status
        slot {
          slot
        }
        patient {
          id
          users {
            name
            email
          }
        }
        doctor {
          id
          users {
            name
          }
        }
      }
    }
  }
`;
