import { gql } from "graphql-request";
export const ADD_DEPARTMENT = gql`
  mutation Mutation($input: CreateDepartmentArguments!) {
    addDepartment(input: $input) {
      success
      message
    }
  }
`;
