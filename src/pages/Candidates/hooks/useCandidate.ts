import { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CANDIDATE } from '../../../features/candidates/graphql/queries';
import {
  CandidateDetail,
  GetCandidateResponse,
  GetCandidateVariables,
} from '../../../features/candidates/graphql/types';

interface UseCandidateParams {
  id: string;
}

interface UseCandidateResult {
  candidate: CandidateDetail | null;
  loading: boolean;
  error?: Error;
  refetch: () => void;
}

/**
 * Custom hook to fetch a single candidate by ID
 * 
 * @param params - Object containing the candidate ID
 * @returns Object containing candidate data, loading state, error, and refetch function
 */
export function useCandidate({ id }: UseCandidateParams): UseCandidateResult {
  const { data, loading, error, refetch: apolloRefetch } = useQuery<
    GetCandidateResponse,
    GetCandidateVariables
  >(GET_CANDIDATE, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: !id, // Skip query if no ID is provided
  });

  const refetch = useCallback(() => {
    apolloRefetch();
  }, [apolloRefetch]);

  const candidate = data?.getCandidate ?? null;

  return {
    candidate,
    loading,
    error: error as Error | undefined,
    refetch,
  };
}

