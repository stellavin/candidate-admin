/**
 * GraphQL types for candidates feature
 */

/**
 * Represents a candidate in the system
 */
export interface Candidate {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
}

/**
 * Response type for listCandidates query
 */
export interface ListCandidatesResponse {
  listCandidates: {
    items: Candidate[];
    nextToken?: string;
  };
}

/**
 * Variables for listCandidates query
 */
export interface ListCandidatesVariables {
  limit?: number;
  nextToken?: string;
}

