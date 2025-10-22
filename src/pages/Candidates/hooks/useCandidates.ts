import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CANDIDATES } from '../../../features/candidates/graphql/queries';
import {
  Candidate,
  ListCandidatesResponse,
  ListCandidatesVariables,
} from '../../../features/candidates/graphql/types';

/**
 * Parameters for the useCandidates hook
 */
interface UseCandidatesParams {
  /** Current page number (0-based) */
  page: number;
  /** Number of items per page */
  pageSize: number;
}

/**
 * Return type for the useCandidates hook
 */
interface UseCandidatesResult {
  /** Array of candidate records */
  rows: Candidate[];
  /** Loading state */
  loading: boolean;
  /** Error object if query failed */
  error?: Error;
  /** Pagination information */
  pageInfo: {
    /** Whether there are more pages available */
    hasNextPage: boolean;
    /** Total count of items (estimated for infinite pagination) */
    totalCount: number;
  };
  /** Function to refetch the data */
  refetch: () => void;
}

/**
 * Custom hook to fetch and manage candidates data with pagination
 * 
 * @param params - Hook parameters
 * @returns Candidates data, loading state, and pagination controls
 */
export function useCandidates({
  page,
  pageSize,
}: UseCandidatesParams): UseCandidatesResult {
  const [nextTokens, setNextTokens] = useState<(string | undefined)[]>([undefined]);

  const { data, loading, error, refetch: apolloRefetch } = useQuery<
    ListCandidatesResponse,
    ListCandidatesVariables
  >(LIST_CANDIDATES, {
    variables: {
      limit: pageSize,
      nextToken: nextTokens[page],
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (data?.listCandidates.nextToken) {
      setNextTokens((prev) => {
        const newTokens = [...prev];
        newTokens[page + 1] = data.listCandidates.nextToken;
        return newTokens;
      });
    }
  }, [data, page]);

  const refetch = useCallback(() => {
    apolloRefetch();
  }, [apolloRefetch]);

  const candidates = data?.listCandidates.items ?? [];
  const hasNextPage = Boolean(data?.listCandidates.nextToken);

  return {
    rows: candidates,
    loading,
    error: error as Error | undefined,
    pageInfo: {
      hasNextPage,
      totalCount: candidates.length + page * pageSize,
    },
    refetch,
  };
}

