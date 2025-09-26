import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Chip, Stack } from '@mui/material';

function GrantsTable({ grants }) {
  const columns = [
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value}
         color={
  params.value?.toLowerCase() === 'open' ? 'success' :
  params.value?.toLowerCase() === 'upcoming' ? 'warning' : 'error'
}

          size="small"
        />
      )
    },
    { field: 'industry', headerName: 'Industry', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { 
      field: 'funding_amount', 
      headerName: 'Funding Amount', 
      width: 150,
      valueFormatter: (params) => `$${params.value.toLocaleString()}`
    },
    {
      field: 'business_contribution_percentage',
      headerName: 'Business Contribution',
      width: 180,
      valueFormatter: (params) => `${params.value}%`
    },
    {
      field: 'opening_date',
      headerName: 'Opening Date',
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'closing_date',
      headerName: 'Closing Date',
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
  {
  field: 'keywords',
  headerName: 'Keywords',
  width: 300,
  renderCell: (params) => {
    const keywords = Array.isArray(params.value) ? params.value : [];
    return (
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {keywords.map((keyword, index) => (
          <Chip key={index} label={keyword} size="small" variant="outlined" />
        ))}
      </Stack>
    );
  }
}

  ];

  return (
    <Paper sx={{ height: 600, width: '100%', mt: 2 }}>
      <DataGrid
        rows={grants}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        density="comfortable"
      />
    </Paper>
  );
}

export default GrantsTable;
