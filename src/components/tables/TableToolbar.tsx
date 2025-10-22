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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export interface StatusFilterOption {
  value: string;
  label: string;
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
}

export function TableToolbar({ 
  title, 
  actions, 
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  statusFilters = [],
  onStatusFiltersChange,
  availableStatuses = [],
}: TableToolbarProps) {
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);

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
        
        {onStatusFiltersChange && availableStatuses.length > 0 && (
          <>
            <Tooltip title="Filter by status">
              <IconButton 
                onClick={handleFilterClick}
                color={hasActiveFilters ? 'primary' : 'default'}
                size="small"
              >
                <FilterListIcon />
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
                        <ListItemText primary={status.label} />
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

