import { gql } from "graphql-request";

export const GET_PATIENT = gql`
  query Query($getPatientId: ID) {
    getPatient(id: $getPatientId) {
      success
      message
      patient {
        id
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
        height
        weight
        marital_status
        occupation
        allergies
      }
    }
  }
`;
