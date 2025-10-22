/**
 * GraphQL types for candidates
 */

export interface Candidate {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  appliedDate?: string;
  experience?: number;
  status?: string;
}

export interface ListCandidatesResponse {
  listCandidates: {
    items: Candidate[];
    nextToken?: string;
  };
}

export interface ListCandidatesVariables {
  firstName?: string;
  lastName?: string;
  limit?: number;
  nextToken?: string;
}

