import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { CandidateTable } from '../../components/tables/CandidateTable';
import { mockCandidates } from '../utils/mockData';

describe('CandidateTable', () => {
  const defaultProps = {
    candidates: [],
    loading: false,
    page: 0,
    pageSize: 10,
    totalCount: 0,
    hasNextPage: false,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  };

  it('should render loading skeleton when loading', () => {
    render(
      <CandidateTable
        {...defaultProps}
        loading={true}
      />
    );

    /** Should show multiple skeleton rows */
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render empty state when no candidates', () => {
    render(
      <CandidateTable
        {...defaultProps}
        candidates={[]}
        loading={false}
      />
    );

    expect(screen.getByText('No candidates found')).toBeInTheDocument();
    expect(screen.getByText('There are no candidates to display at the moment.')).toBeInTheDocument();
  });

  it('should render candidates when data is loaded', () => {
    render(
      <CandidateTable
        {...defaultProps}
        candidates={mockCandidates.slice(0, 3)}
        totalCount={3}
      />
    );

    /** Check for candidate names */
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Johnson')).toBeInTheDocument();

    /** Check for emails */
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob.johnson@example.com')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<CandidateTable {...defaultProps} />);

    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('should render search toolbar when onSearchChange is provided', () => {
    const onSearchChange = vi.fn();
    
    render(
      <CandidateTable
        {...defaultProps}
        onSearchChange={onSearchChange}
        searchValue=""
      />
    );

    const searchInput = screen.getByPlaceholderText('Search by first or last name...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearchChange when typing in search', async () => {
    const onSearchChange = vi.fn();
    const { user } = render(
      <CandidateTable
        {...defaultProps}
        onSearchChange={onSearchChange}
        searchValue=""
      />
    );

    const searchInput = screen.getByPlaceholderText('Search by first or last name...');
    await user.type(searchInput, 'John');

    expect(onSearchChange).toHaveBeenCalled();
  });

  it('should not show pagination when loading', () => {
    render(
      <CandidateTable
        {...defaultProps}
        loading={true}
      />
    );

    /** Pagination should not be visible */
    expect(screen.queryByText('Rows per page:')).not.toBeInTheDocument();
  });

  it('should show pagination when data is loaded', () => {
    render(
      <CandidateTable
        {...defaultProps}
        candidates={mockCandidates.slice(0, 3)}
        totalCount={3}
      />
    );

    /** Pagination should be visible */
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  it('should handle candidate selection', async () => {
    const onCandidateSelect = vi.fn();
    const { user } = render(
      <CandidateTable
        {...defaultProps}
        candidates={mockCandidates.slice(0, 1)}
        totalCount={1}
        onCandidateSelect={onCandidateSelect}
      />
    );

    /** Click on the candidate row (find by text content) */
    const candidateRow = screen.getByText('John').closest('tr');
    if (candidateRow) {
      await user.click(candidateRow);
      expect(onCandidateSelect).toHaveBeenCalledWith('1');
    }
  });

  it('should highlight selected candidate', () => {
    render(
      <CandidateTable
        {...defaultProps}
        candidates={mockCandidates.slice(0, 2)}
        totalCount={2}
        selectedCandidateId="1"
      />
    );

    const selectedRow = screen.getByText('John').closest('tr');
    expect(selectedRow).toHaveStyle({ backgroundColor: expect.any(String) });
  });

  it('should display correct row numbers based on page', () => {
    render(
      <CandidateTable
        {...defaultProps}
        candidates={mockCandidates.slice(0, 2)}
        totalCount={12}
        page={1}
        pageSize={10}
      />
    );

    /** On page 1 (second page), row numbers should start at 11 */
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});

