import React, { useState } from 'react';
import { 
  Toolbar, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Divider,
  Button,
  Tooltip,
  Badge,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export interface StatusFilterOption {
  value: string;
  label: string;
  count?: number;
}

interface TableToolbarProps {
  title: string;
  actions?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  statusFilters?: string[];
  onStatusFiltersChange?: (filters: string[]) => void;
  availableStatuses?: StatusFilterOption[];
  totalCount?: number;
}

/**
 * Table toolbar component with search and filter capabilities.
 * Provides search input and status filter dropdown for data tables.
 * @param {TableToolbarProps} props - Component props
 * @returns {JSX.Element} Toolbar with search and filters
 */
export function TableToolbar({ 
  title, 
  actions, 
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  statusFilters = [],
  onStatusFiltersChange,
  availableStatuses = [],
  totalCount,
}: TableToolbarProps) {
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  // Extract counts for specific statuses
  const getStatusCount = (status: string) => {
    const statusOption = availableStatuses.find(s => s.value.toLowerCase() === status.toLowerCase());
    return statusOption?.count || 0;
  };
  
  const shortlistedCount = getStatusCount('shortlisted');
  const appliedCount = getStatusCount('applied');
  const rejectedCount = getStatusCount('rejected');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event.target.value);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusToggle = (status: string) => {
    if (!onStatusFiltersChange) return;
    
    const currentIndex = statusFilters.indexOf(status);
    const newFilters = [...statusFilters];
    
    if (currentIndex === -1) {
      newFilters.push(status);
    } else {
      newFilters.splice(currentIndex, 1);
    }
    
    onStatusFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    onStatusFiltersChange?.([]);
  };

  const isFilterOpen = Boolean(filterAnchorEl);
  const hasActiveFilters = statusFilters.length > 0;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        borderBottom: 1,
        borderColor: 'divider',
        gap: 2,
        minHeight: { xs: 56, sm: 64 },
      }}
    >
      {title && (
        <Typography
          sx={{ flex: '0 0 auto' }}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      )}
      
      {onSearchChange && (
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          sx={{ 
            flex: '1 1 auto',
            maxWidth: 400,
            '& .MuiInputBase-root': {
              height: 36,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      )}
      
      <Box sx={{ flex: '0 0 auto', ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
        {actions}
        
        {/* Status badges */}
        {totalCount !== undefined && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Chip 
              label={`Total: ${totalCount}`} 
              size="small" 
              color="default"
              variant="outlined"
            />
            <Chip 
              label={`Shortlisted: ${shortlistedCount}`} 
              size="small" 
              color="info"
              variant="outlined"
            />
            <Chip 
              label={`Applied: ${appliedCount}`} 
              size="small" 
              color="primary"
              variant="outlined"
            />
            <Chip 
              label={`Rejected: ${rejectedCount}`} 
              size="small" 
              color="error"
              variant="outlined"
            />
          </Box>
        )}
        
        {onStatusFiltersChange && availableStatuses.length > 0 && (
          <>
            <Tooltip title="Filter by status">
              <IconButton 
                onClick={handleFilterClick}
                color={hasActiveFilters ? 'primary' : 'default'}
                size="small"
              >
                <Badge 
                  badgeContent={hasActiveFilters ? statusFilters.length : 0} 
                  color="primary"
                  invisible={!hasActiveFilters}
                >
                  <FilterListIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Popover
              open={isFilterOpen}
              anchorEl={filterAnchorEl}
              onClose={handleFilterClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ minWidth: 200 }}>
                <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Filter by Status
                  </Typography>
                  {hasActiveFilters && (
                    <Button 
                      size="small" 
                      onClick={handleClearFilters}
                      sx={{ minWidth: 'auto', textTransform: 'none' }}
                    >
                      Clear
                    </Button>
                  )}
                </Box>
                <Divider />
                <List sx={{ py: 0 }}>
                  {availableStatuses.map((status) => (
                    <ListItem key={status.value} disablePadding>
                      <ListItemButton 
                        onClick={() => handleStatusToggle(status.value)}
                        dense
                      >
                        <Checkbox
                          edge="start"
                          checked={statusFilters.includes(status.value)}
                          tabIndex={-1}
                          disableRipple
                          size="small"
                        />
                        <ListItemText 
                          primary={status.label}
                          secondary={status.count !== undefined ? `${status.count} candidate${status.count !== 1 ? 's' : ''}` : undefined}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Popover>
          </>
        )}
      </Box>
    </Toolbar>
  );
}

