import { gql } from "graphql-request";

export const GET_DEPARTMENTS = gql`
  query Query {
    getDepartment {
      success
      message
      departments {
        id
        name
        status
      }
    }
  }
`;
