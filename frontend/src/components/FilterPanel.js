import React from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack
} from '@mui/material';

function FilterPanel({ onFilterChange }) {
  const industries = [
    'Technology', 'Healthcare', 'Agriculture',
    'Manufacturing', 'Education', 'Clean Energy'
  ];

  const locations = [
    'New South Wales', 'Victoria', 'Queensland',
    'Western Australia', 'South Australia', 'Tasmania'
  ];

  const statuses = ['open', 'closed', 'upcoming'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <Paper sx={{ p: 2, width: 300, minHeight: '100%', boxShadow: 3 }}>
      <Stack spacing={3}>
        {/* Industry Filter */}
        <FormControl fullWidth>
          <InputLabel>Industry</InputLabel>
          <Select
            name="industry"
            label="Industry"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="">All Industries</MenuItem>
            {industries.map(industry => (
              <MenuItem key={industry} value={industry}>{industry}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location Filter */}
        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            name="location"
            label="Location"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="">All Locations</MenuItem>
            {locations.map(location => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            label="Status"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {statuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Min Funding */}
        <TextField
          name="min_funding"
          label="Min Funding ($)"
          type="number"
          fullWidth
          onChange={handleChange}
        />

        {/* Max Funding */}
        <TextField
          name="max_funding"
          label="Max Funding ($)"
          type="number"
          fullWidth
          onChange={handleChange}
        />
      </Stack>
    </Paper>
  );
}

export default FilterPanel;

