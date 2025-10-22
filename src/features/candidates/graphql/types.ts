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
 * Represents a detailed candidate with all available information
 */
export interface CandidateDetail extends Candidate {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  resume?: string;
  coverLetter?: string;
  portfolio?: string;
  linkedIn?: string;
  github?: string;
  appliedDate?: string;
  notes?: string;
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

/**
 * Response type for getCandidate query
 */
export interface GetCandidateResponse {
  getCandidate: CandidateDetail;
}

/**
 * Variables for getCandidate query
 */
export interface GetCandidateVariables {
  id: string;
}

