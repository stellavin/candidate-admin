import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import { CandidateDetailPanel } from '../../components/details/CandidateDetailPanel';
import { GET_CANDIDATE } from '../../features/candidates/graphql/queries';
import { mockCandidateDetail } from '../utils/mockData';
import { GraphQLError } from 'graphql';

describe('CandidateDetailPanel', () => {
  const defaultProps = {
    candidateId: '1',
    onClose: vi.fn(),
  };

  it('should show loading state initially', () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: mockCandidateDetail,
          },
        },
        delay: 100,
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display candidate details after loading', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: mockCandidateDetail,
          },
        },
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should show error state when query fails', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          errors: [new GraphQLError('Failed to fetch candidate')],
        },
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('Error loading candidate details')).toBeInTheDocument();
    });

    expect(screen.getByText(/Failed to fetch candidate/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should call refetch when retry button is clicked', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          errors: [new GraphQLError('Network error')],
        },
      },
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: mockCandidateDetail,
          },
        },
      },
    ];

    const { user } = render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    /** Wait for error state */
    await waitFor(() => {
      expect(screen.getByText('Error loading candidate details')).toBeInTheDocument();
    });

    /** Click retry button */
    const retryButton = screen.getByRole('button', { name: /retry/i });
    await user.click(retryButton);

    /** Should show loading then success */
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: mockCandidateDetail,
          },
        },
      },
    ];

    const { user } = render(
      <CandidateDetailPanel {...defaultProps} onClose={onClose} />,
      { mocks }
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    /** Find close button by its icon */
    const closeIcon = screen.getByTestId('CloseIcon');
    const closeButton = closeIcon.closest('button');
    if (closeButton) {
      await user.click(closeButton);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should show not found message when candidate is null', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '999' },
        },
        result: {
          data: {
            getCandidate: null,
          },
        },
      },
    ];

    render(
      <CandidateDetailPanel {...defaultProps} candidateId="999" />,
      { mocks }
    );

    await waitFor(() => {
      expect(screen.getByText('Candidate not found')).toBeInTheDocument();
    });
  });

  it('should display status with correct color chip', async () => {
    const activeMocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: { ...mockCandidateDetail, status: 'active' },
          },
        },
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks: activeMocks });

    await waitFor(() => {
      const statusChip = screen.getByText('Active');
      expect(statusChip).toBeInTheDocument();
      expect(statusChip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorSuccess');
    });
  });

  it('should show fallback for missing name', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: {
              ...mockCandidateDetail,
              firstName: undefined,
              lastName: undefined,
            },
          },
        },
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });

  it('should display email as clickable mailto link', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: mockCandidateDetail,
          },
        },
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    await waitFor(() => {
      const emailLink = screen.getByText('john.doe@example.com');
      expect(emailLink).toBeInTheDocument();
      expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:john.doe@example.com');
    });
  });

  it('should display all detail sections', async () => {
    const mocks = [
      {
        request: {
          query: GET_CANDIDATE,
          variables: { id: '1' },
        },
        result: {
          data: {
            getCandidate: mockCandidateDetail,
          },
        },
      },
    ];

    render(<CandidateDetailPanel {...defaultProps} />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });
});

