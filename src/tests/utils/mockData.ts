import { Candidate, CandidateDetail } from '../../features/candidates/graphql/types';

/**
 * Mock candidate data for testing
 */
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'pending',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    status: 'rejected',
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@example.com',
    status: 'active',
  },
  {
    id: '5',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    status: 'shortlisted',
  },
];

/**
 * Mock candidate detail data for testing individual candidate views
 */
export const mockCandidateDetail: CandidateDetail = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  status: 'active',
  phone: '+1234567890',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'USA',
};

/**
 * Factory function to create mock candidates with optional overrides
 * @param overrides - Partial candidate properties to override defaults
 * @returns A complete mock candidate object
 */
export function createMockCandidate(overrides?: Partial<Candidate>): Candidate {
  return {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    status: 'active',
    ...overrides,
  };
}

