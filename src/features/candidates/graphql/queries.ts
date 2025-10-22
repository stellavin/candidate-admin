import { gql } from '@apollo/client';

/**
 * GraphQL query to fetch a paginated list of candidates
 * 
 * @param limit - Maximum number of candidates to return (optional)
 * @param nextToken - Token for pagination (optional)
 * @returns List of candidates with pagination token
 */
export const LIST_CANDIDATES = gql`
  query ListCandidates(
    $limit: Int
    $nextToken: String
  ) {
    listCandidates(
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstName
        lastName
        email
        status
      }
      nextToken
    }
  }
`;

/**
 * GraphQL query to fetch a single candidate by ID
 * 
 * @param id - Candidate ID
 * @returns Detailed candidate information
 */
export const GET_CANDIDATE = gql`
  query GetCandidate($id: ID!) {
    getCandidate(id: $id) {
      id
      firstName
      lastName
      email
      status
    }
  }
`;

