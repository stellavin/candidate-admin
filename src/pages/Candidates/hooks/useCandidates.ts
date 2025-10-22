import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CANDIDATES } from '../../../features/candidates/graphql/queries';
import {
  Candidate,
  ListCandidatesResponse,
  ListCandidatesVariables,
} from '../../../features/candidates/graphql/types';

interface UseCandidatesParams {
  firstName?: string;
  lastName?: string;
  page: number;
  pageSize: number;
}

interface UseCandidatesResult {
  rows: Candidate[];
  loading: boolean;
  error?: Error;
  pageInfo: {
    hasNextPage: boolean;
    totalCount: number;
  };
  refetch: () => void;
}

export function useCandidates({
  firstName,
  lastName,
  page,
  pageSize,
}: UseCandidatesParams): UseCandidatesResult {
  const [nextTokens, setNextTokens] = useState<(string | undefined)[]>([undefined]);

  // Build query variables
  const variables: ListCandidatesVariables = {
    limit: pageSize,
    nextToken: nextTokens[page],
  };

  if (firstName) {
    variables.firstName = firstName;
  }

  if (lastName) {
    variables.lastName = lastName;
  }

  const { data, loading, error, refetch: apolloRefetch } = useQuery<
    ListCandidatesResponse,
    ListCandidatesVariables
  >(LIST_CANDIDATES, {
    variables,
    fetchPolicy: 'network-only',
  });

  // Reset pagination when filters change
  useEffect(() => {
    setNextTokens([undefined]);
  }, [firstName, lastName]);

  // Store next tokens for pagination
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

  return {
    rows: data?.listCandidates.items || [],
    loading,
    error: error as Error | undefined,
    pageInfo: {
      hasNextPage: !!data?.listCandidates.nextToken,
      totalCount: (data?.listCandidates.items.length || 0) + page * pageSize,
    },
    refetch,
  };
}

