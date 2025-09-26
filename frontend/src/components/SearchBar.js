import React from 'react';
import { Paper, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    onSearch(query);
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        p: '2px 4px', 
        display: 'flex', 
        alignItems: 'center',
        width: '100%',
        mb: 2
      }}
    >
      <TextField
        name="search"
        fullWidth
        placeholder="Search grants by title, description, or keywords..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
}

export default SearchBar;
