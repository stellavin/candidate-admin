import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import { CandidatesListPage } from '../../pages/Candidates/CandidatesListPage';
import { LIST_CANDIDATES } from '../../features/candidates/graphql/queries';
import { mockCandidates } from '../utils/mockData';

describe('CandidatesListPage', () => {
  it('should render page title and description', () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: [],
              nextToken: undefined,
            },
          },
        },
      },
    ];

    render(<CandidatesListPage />, { mocks });

    expect(screen.getByText('Candidates')).toBeInTheDocument();
    expect(screen.getByText('View and filter all candidate applications')).toBeInTheDocument();
  });

  it('should display loading skeleton initially', () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: undefined,
            },
          },
        },
        delay: 100,
      },
    ];

    render(<CandidatesListPage />, { mocks });

    /** Should show skeleton while loading */
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should display candidates after loading', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates.slice(0, 3),
              nextToken: undefined,
            },
          },
        },
      },
    ];

    render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('should filter candidates by search term', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: undefined,
            },
          },
        },
      },
    ];

    const { user } = render(<CandidatesListPage />, { mocks });

    /** Wait for initial load */
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Type in search */
    const searchInput = screen.getByPlaceholderText('Search by first or last name...');
    await user.type(searchInput, 'Jane');

    /** Wait for debounce and filter */
    await waitFor(() => {
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should show empty state when no candidates match search', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: undefined,
            },
          },
        },
      },
    ];

    const { user } = render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Search for non-existent name */
    const searchInput = screen.getByPlaceholderText('Search by first or last name...');
    await user.clear(searchInput);
    await user.type(searchInput, 'NonExistent');

    /** Wait for debounce and empty state */
    await waitFor(() => {
      expect(screen.getByText('No candidates found')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should filter candidates by status', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: undefined,
            },
          },
        },
      },
    ];

    const { user } = render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Wait for the popover to appear and click on a checkbox */
    await waitFor(() => {
      expect(screen.getByText('Filter by Status')).toBeInTheDocument();
    });

    /** Find and click the checkbox for Active status */
    const checkboxes = screen.getAllByRole('checkbox');
    /** First checkbox should be Active (alphabetically sorted) */
    await user.click(checkboxes[0]);

    /** Should show only active candidates (John and Alice) */
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
      /** pending */
      expect(screen.queryByText('Jane')).not.toBeInTheDocument();
      /** rejected */
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  it('should display row numbers starting from 1 on first page', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates.slice(0, 2),
              nextToken: undefined,
            },
          },
        },
      },
    ];

    render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Verify row numbers start at 1 */
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should open detail panel when candidate is selected', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates.slice(0, 1),
              nextToken: undefined,
            },
          },
        },
      },
    ];

    const { user } = render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Click on candidate row */
    const candidateRow = screen.getByText('John').closest('tr');
    if (candidateRow) {
      await user.click(candidateRow);
    }

    /** Detail panel should appear (grid layout changes) */
    await waitFor(() => {
      const gridItems = document.querySelectorAll('[class*="MuiGrid-item"]');
      /** Should have 2 grid items when detail panel is open */
      expect(gridItems.length).toBeGreaterThan(1);
    });
  });

  it('should handle pagination', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: 'next-token',
            },
          },
        },
      },
    ];

    render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Pagination controls should be present */
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  it('should compute available statuses from all candidates', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: undefined,
            },
          },
        },
      },
    ];

    const { user } = render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Open filter to see available statuses */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Should show unique statuses from all candidates - verify filter header exists */
    await waitFor(() => {
      expect(screen.getByText('Filter by Status')).toBeInTheDocument();
    });

    /** Verify all unique statuses are available as checkboxes */
    const checkboxes = screen.getAllByRole('checkbox');
    /** We have 4 unique statuses in mockCandidates: active, pending, rejected, shortlisted */
    expect(checkboxes.length).toBe(4);
  });

  it('should have pagination controls with page size options', async () => {
    const mocks = [
      {
        request: {
          query: LIST_CANDIDATES,
          variables: { limit: 10, nextToken: undefined },
        },
        result: {
          data: {
            listCandidates: {
              items: mockCandidates,
              nextToken: undefined,
            },
          },
        },
      },
    ];

    render(<CandidatesListPage />, { mocks });

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    /** Verify pagination controls exist */
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
});
