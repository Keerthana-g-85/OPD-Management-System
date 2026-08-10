import { gql } from "graphql-request";

export const GET_PRESCRIPTIONS = gql`
  query GetPrescriptions($appointmentId: ID!) {
    getPrescriptions(appointment_id: $appointmentId) {
      success
      message

      prescriptions {
        id
        name
        dosage
        frequency
        duration
        createdAt
      }
    }
  }
`;