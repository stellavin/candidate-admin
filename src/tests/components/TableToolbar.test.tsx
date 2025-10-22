import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import { TableToolbar } from '../../components/tables/TableToolbar';

describe('TableToolbar', () => {
  it('should render title when provided', () => {
    render(<TableToolbar title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should not render title section when title is empty', () => {
    render(<TableToolbar title="" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render search input when onSearchChange is provided', () => {
    const onSearchChange = vi.fn();
    
    render(
      <TableToolbar
        title="Test"
        onSearchChange={onSearchChange}
        searchPlaceholder="Search items..."
      />
    );

    const searchInput = screen.getByPlaceholderText('Search items...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearchChange when typing in search', async () => {
    const onSearchChange = vi.fn();
    const { user } = render(
      <TableToolbar
        title="Test"
        onSearchChange={onSearchChange}
        searchValue=""
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'test query');

    /** Should be called for each character typed */
    expect(onSearchChange).toHaveBeenCalled();
    expect(onSearchChange).toHaveBeenCalledWith(expect.stringContaining('t'));
  });

  it('should display search value', () => {
    render(
      <TableToolbar
        title="Test"
        onSearchChange={vi.fn()}
        searchValue="current search"
      />
    );

    const searchInput = screen.getByDisplayValue('current search');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render filter button when filters are available', () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={[]}
      />
    );

    const filterButton = screen.getByRole('button', { name: /filter/i });
    expect(filterButton).toBeInTheDocument();
  });

  it('should open filter popover when filter button is clicked', async () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={[]}
      />
    );

    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Filter options should appear */
    await waitFor(() => {
      expect(screen.getByText('Filter by Status')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  it('should toggle status filter when clicked', async () => {
    const onStatusFiltersChange = vi.fn();
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={onStatusFiltersChange}
        availableStatuses={availableStatuses}
        statusFilters={[]}
      />
    );

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Click on Active status */
    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
    
    const activeOption = screen.getByText('Active').closest('div[role="button"]');
    if (activeOption) {
      await user.click(activeOption);
    }

    expect(onStatusFiltersChange).toHaveBeenCalledWith(['active']);
  });

  it('should show clear button when filters are active', async () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={['active']}
      />
    );

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  it('should clear all filters when clear button is clicked', async () => {
    const onStatusFiltersChange = vi.fn();
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={onStatusFiltersChange}
        availableStatuses={availableStatuses}
        statusFilters={['active', 'pending']}
      />
    );

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Click clear button */
    await waitFor(() => {
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
    
    const clearButton = screen.getByText('Clear');
    await user.click(clearButton);

    expect(onStatusFiltersChange).toHaveBeenCalledWith([]);
  });

  it('should show checked status for selected filters', async () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={['active']}
      />
    );

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      /** First checkbox (Active) should be checked */
      expect(checkboxes[0]).toBeChecked();
      /** Second checkbox (Pending) should not be checked */
      expect(checkboxes[1]).not.toBeChecked();
    });
  });

  it('should highlight filter button when filters are active', () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
    ];

    render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={['active']}
      />
    );

    const filterButton = screen.getByRole('button', { name: /filter/i });
    expect(filterButton).toHaveClass('MuiIconButton-colorPrimary');
  });

  it('should render custom actions', () => {
    render(
      <TableToolbar
        title="Test"
        actions={<button>Custom Action</button>}
      />
    );

    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });

  it('should display counts next to each status option', async () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={[]}
      />
    );

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Counts should be displayed */
    await waitFor(() => {
      expect(screen.getByText('5 candidates')).toBeInTheDocument();
      expect(screen.getByText('3 candidates')).toBeInTheDocument();
    });
  });

  it('should display singular count correctly', async () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 1 },
    ];

    const { user } = render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={[]}
      />
    );

    /** Open filter popover */
    const filterButton = screen.getByRole('button', { name: /filter/i });
    await user.click(filterButton);

    /** Should show singular form */
    await waitFor(() => {
      expect(screen.getByText('1 candidate')).toBeInTheDocument();
    });
  });

  it('should show badge with filter count when filters are active', () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
      { value: 'pending', label: 'Pending', count: 3 },
    ];

    render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={['active', 'pending']}
      />
    );

    /** Badge should show the count of active filters */
    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });

  it('should not show badge when no filters are active', () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
    ];

    render(
      <TableToolbar
        title="Test"
        onStatusFiltersChange={vi.fn()}
        availableStatuses={availableStatuses}
        statusFilters={[]}
      />
    );

    /** Badge should not be visible */
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('should display total count badge when totalCount is provided', () => {
    render(
      <TableToolbar
        title="Test"
        totalCount={25}
      />
    );

    expect(screen.getByText('Total: 25')).toBeInTheDocument();
  });

  it('should display shortlisted count badge', () => {
    const availableStatuses = [
      { value: 'shortlisted', label: 'Shortlisted', count: 8 },
      { value: 'applied', label: 'Applied', count: 10 },
    ];

    render(
      <TableToolbar
        title="Test"
        totalCount={25}
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.getByText('Shortlisted: 8')).toBeInTheDocument();
  });

  it('should display applied count badge', () => {
    const availableStatuses = [
      { value: 'applied', label: 'Applied', count: 12 },
    ];

    render(
      <TableToolbar
        title="Test"
        totalCount={25}
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.getByText('Applied: 12')).toBeInTheDocument();
  });

  it('should display rejected count badge', () => {
    const availableStatuses = [
      { value: 'rejected', label: 'Rejected', count: 5 },
    ];

    render(
      <TableToolbar
        title="Test"
        totalCount={25}
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.getByText('Rejected: 5')).toBeInTheDocument();
  });

  it('should display all status badges with correct counts', () => {
    const availableStatuses = [
      { value: 'shortlisted', label: 'Shortlisted', count: 8 },
      { value: 'applied', label: 'Applied', count: 10 },
      { value: 'rejected', label: 'Rejected', count: 5 },
      { value: 'active', label: 'Active', count: 2 },
    ];

    render(
      <TableToolbar
        title="Test"
        totalCount={25}
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.getByText('Total: 25')).toBeInTheDocument();
    expect(screen.getByText('Shortlisted: 8')).toBeInTheDocument();
    expect(screen.getByText('Applied: 10')).toBeInTheDocument();
    expect(screen.getByText('Rejected: 5')).toBeInTheDocument();
  });

  it('should display zero for status badges when status is not in availableStatuses', () => {
    const availableStatuses = [
      { value: 'active', label: 'Active', count: 5 },
    ];

    render(
      <TableToolbar
        title="Test"
        totalCount={5}
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.getByText('Shortlisted: 0')).toBeInTheDocument();
    expect(screen.getByText('Applied: 0')).toBeInTheDocument();
    expect(screen.getByText('Rejected: 0')).toBeInTheDocument();
  });

  it('should not display status badges when totalCount is not provided', () => {
    const availableStatuses = [
      { value: 'shortlisted', label: 'Shortlisted', count: 8 },
      { value: 'applied', label: 'Applied', count: 10 },
    ];

    render(
      <TableToolbar
        title="Test"
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.queryByText(/Total:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Shortlisted:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Applied:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Rejected:/)).not.toBeInTheDocument();
  });

  it('should handle case-insensitive status matching', () => {
    const availableStatuses = [
      { value: 'SHORTLISTED', label: 'Shortlisted', count: 5 },
      { value: 'Applied', label: 'Applied', count: 3 },
      { value: 'REJECTED', label: 'Rejected', count: 2 },
    ];

    render(
      <TableToolbar
        title="Test"
        totalCount={15}
        availableStatuses={availableStatuses}
      />
    );

    expect(screen.getByText('Shortlisted: 5')).toBeInTheDocument();
    expect(screen.getByText('Applied: 3')).toBeInTheDocument();
    expect(screen.getByText('Rejected: 2')).toBeInTheDocument();
  });
});

