import { gql } from "graphql-request";

export const ADD_CONSULTATION = gql`
  mutation AddConsultation($input: CreateConsultationArguments!) {
    addConsultation(input: $input) {
      message
      success
    }
  }
`;
