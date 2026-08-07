import { gql } from "graphql-request";

export const GET_DOCTOR_APPOINMENTS = gql`
  query GetDoctorAppointment($id: ID!) {
    getDoctorAppointment(doctor_id: $id) {
      success
      message
      appointment {
        id
        appointment_date
        slot {
          slot
          id
        }
        patient {
          users {
            name
          }
          height
          weight
          marital_status
          occupation
          allergies
        }
        doctor {
          users {
            name
          }
        }
        status
      }
    }
  }
`;
