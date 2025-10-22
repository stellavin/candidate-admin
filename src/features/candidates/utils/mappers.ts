import { Candidate } from '../graphql/types';

/**
 * Utility functions for mapping and transforming candidate data
 */

export function formatCandidateName(candidate: Candidate): string {
  const parts = [candidate.firstName, candidate.lastName].filter(Boolean);
  return parts.join(' ') || 'Unknown';
}

export function getCandidateInitials(candidate: Candidate): string {
  const first = candidate.firstName?.charAt(0)?.toUpperCase() || '';
  const last = candidate.lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}` || '?';
}

export function sortCandidatesByDate(candidates: Candidate[]): Candidate[] {
  return [...candidates].sort((a, b) => {
    const dateA = a.appliedDate ? new Date(a.appliedDate).getTime() : 0;
    const dateB = b.appliedDate ? new Date(b.appliedDate).getTime() : 0;
    return dateB - dateA; // Most recent first
  });
}

