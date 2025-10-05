import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchBar from './components/SearchBar';
import GrantsTable from './components/GrantsTable';
import FilterPanel from './components/FilterPanel';
import DashboardStats from './components/DashboardStats';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const API_BASE_URL = 'https://grants-backend-nra7.onrender.com/api';

function App() {
  const [grants, setGrants] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    query: '',
    industry: '',
    location: '',
    status: '',
    minFunding: '',
    maxFunding: '',
  });

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            params.append(key, value);
          }
        });

        const response = await axios.get(`${API_BASE_URL}/grants?${params}`);
        setGrants(response.data);
      } catch (error) {
        console.error('Error fetching grants:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchGrants();
    fetchStats();
  }, [filters]);

  

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          <SearchBar onSearch={handleSearch} />
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {/* ✅ Fix: Prevent filter panel from collapsing */}
            <Box sx={{ width: 300, flexShrink: 0 }}>
              <FilterPanel onFilterChange={handleFilterChange} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              {stats && <DashboardStats stats={stats} />}
              <GrantsTable grants={grants} />
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
