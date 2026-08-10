import { gql } from "graphql-request";

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment ($input: UpdateDepartmentArguments!)  {
    updateDepartment(input: $input) {
      success
      message
    }
  }
`;
