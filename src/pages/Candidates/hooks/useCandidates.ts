import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CANDIDATES } from '../../../features/candidates/graphql/queries';
import {
  Candidate,
  ListCandidatesResponse,
  ListCandidatesVariables,
} from '../../../features/candidates/graphql/types';

interface UseCandidatesParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  statusFilters?: string[];
}

interface UseCandidatesResult {
  rows: Candidate[];
  allCandidates: Candidate[];
  loading: boolean;
  error?: Error;
  pageInfo: {
    hasNextPage: boolean;
    totalCount: number;
  };
  refetch: () => void;
}

/**
 * Filters candidates by search term matching first name, last name, or full name.
 * @param {Candidate[]} candidates - Array of candidates to filter
 * @param {string} searchTerm - Search term to match
 * @returns {Candidate[]} Filtered candidates
 */
function filterCandidatesBySearch(
  candidates: Candidate[],
  searchTerm: string
): Candidate[] {
  if (!searchTerm.trim()) {
    return candidates;
  }

  const searchLower = searchTerm.toLowerCase().trim();
  
  return candidates.filter((candidate) => {
    const firstName = (candidate.firstName || '').toLowerCase();
    const lastName = (candidate.lastName || '').toLowerCase();
    const fullName = `${firstName} ${lastName}`.trim();
    
    return (
      firstName.includes(searchLower) ||
      lastName.includes(searchLower) ||
      fullName.includes(searchLower)
    );
  });
}

/**
 * Filters candidates by status.
 * @param {Candidate[]} candidates - Array of candidates to filter
 * @param {string[]} statusFilters - Array of status values to match
 * @returns {Candidate[]} Filtered candidates
 */
function filterCandidatesByStatus(
  candidates: Candidate[],
  statusFilters: string[]
): Candidate[] {
  if (statusFilters.length === 0) {
    return candidates;
  }

  return candidates.filter((candidate) => {
    if (!candidate.status) return false;
    return statusFilters.includes(candidate.status);
  });
}

/**
 * Custom hook for fetching and filtering candidates with pagination.
 * @param {UseCandidatesParams} params - Hook parameters
 * @returns {UseCandidatesResult} Candidates data, loading state, and pagination info
 */
export function useCandidates({
  page,
  pageSize,
  searchTerm = '',
  statusFilters = [],
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

  const allCandidates = data?.listCandidates.items ?? [];
  
  const filteredCandidates = useMemo(() => {
    let result = allCandidates;
    result = filterCandidatesBySearch(result, searchTerm);
    result = filterCandidatesByStatus(result, statusFilters);
    return result;
  }, [allCandidates, searchTerm, statusFilters]);

  const hasNextPage = Boolean(data?.listCandidates.nextToken);

  return {
    rows: filteredCandidates,
    allCandidates,
    loading,
    error: error as Error | undefined,
    pageInfo: {
      hasNextPage,
      totalCount: filteredCandidates.length + page * pageSize,
    },
    refetch,
  };
}

