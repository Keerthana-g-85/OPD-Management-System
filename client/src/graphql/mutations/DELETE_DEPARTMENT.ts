import { gql } from "graphql-request";

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($input: DeleteDepartmentArguments!) {
    deleteDepartment(input: $input) {
      success
      message
    }
  }
`;
