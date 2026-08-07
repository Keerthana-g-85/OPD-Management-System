import { gql } from "graphql-request";

export const GET_DOCTORS = gql`
  query GetDoctor {
    getDoctor {
      success
      message
      doctors {
        id
        qualification
        experience
        charges
        status
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
        }
        department {
          id
          name
        }
      }
    }
  }
`;
