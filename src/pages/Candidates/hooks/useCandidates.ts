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
  
  // Filter candidates based on search term and status
  const filteredCandidates = useMemo(() => {
    let result = allCandidates;
    
    // Apply search filter
    result = filterCandidatesBySearch(result, searchTerm);
    
    // Apply status filter
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

