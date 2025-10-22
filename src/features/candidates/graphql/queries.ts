import { gql } from '@apollo/client';

export const LIST_CANDIDATES = gql`
  query ListCandidates(
    $firstName: String
    $lastName: String
    $limit: Int
    $nextToken: String
  ) {
    listCandidates(
      firstName: $firstName
      lastName: $lastName
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstName
        lastName
        email
        role
        appliedDate
        experience
        status
      }
      nextToken
    }
  }
`;

