  import React, { useEffect } from 'react';
  import { DataGrid } from '@mui/x-data-grid';
  import { Paper, Chip, Stack, Box } from '@mui/material';
  import Dialog from '@mui/material/Dialog';
  import DialogTitle from '@mui/material/DialogTitle';
  import DialogContent from '@mui/material/DialogContent';
  import DialogActions from '@mui/material/DialogActions';
  import Button from '@mui/material/Button';
  import Typography from '@mui/material/Typography';

  function GrantsTable({ grants }) {
    const [selectedRowData, setSelectedRowData] = React.useState(null);
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
        valueFormatter: (params) => parseDate(params.value)

      },
      {
        field: 'closing_date',
        headerName: 'Closing Date',
        width: 150,
        valueFormatter: (params) => parseDate(params.value)
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
          onRowSelectionModelChange={(item) => {
            console.log(item);
            // get the selected row data
            const selectedRowData = grants.find((grant) => grant.id === item[0]);
            console.log(selectedRowData);
            setSelectedRowData(selectedRowData);
          }}
          rows={grants}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          density="comfortable"
        />
        <ModalBox  onClose={() => setSelectedRowData(null)} grant={selectedRowData} />
      </Paper>
    );
  }

  export default GrantsTable;


  function parseDate(dateStr) {
    try{
      const [day, month, yearAndTime] = dateStr.split('/');
        const [year] = yearAndTime.split(' ');
        const isoString = `${year}-${month}-${day}`;
        return isoString
    }
    catch(e){
      //  normal date fornat
      return new Date(dateStr).toLocaleDateString() ? new Date(dateStr).toLocaleDateString() : dateStr
    } 

  }


  function ModalBox({ onClose, grant }) {
    const [modalGrant, setModalGrant] = React.useState(grant);

    useEffect(() => {
      console.log('ModalBox grant data:', grant);
      setModalGrant(grant);
    }, [grant]);

    if(!modalGrant) {
      return null;
    }

    return (
      <Dialog
        open={Boolean(modalGrant)}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#333',
            borderBottom: '1px solid #ddd',
            marginBottom: 1,
          }}
        >
          {modalGrant.title}
        </DialogTitle>

        <DialogContent >
          <Box component="table" sx={{ width: '100%', mb: 2, borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td><strong>Status:</strong></td>
                <td>
                  <Chip
                    label={modalGrant.status}
                    color={
                      modalGrant.status?.toLowerCase() === 'open'
                        ? 'success'
                        : modalGrant.status?.toLowerCase() === 'upcoming'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Industry:</strong></td>
                <td>{modalGrant.industry}</td>
              </tr>
              <tr>
                <td><strong>Location:</strong></td>
                <td>{modalGrant.location}</td>
              </tr>
              <tr>
                <td><strong>Funding Amount:</strong></td>
                <td>${modalGrant.funding_amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Business Contribution:</strong></td>
                <td>{modalGrant.business_contribution_percentage}%</td>
              </tr>
              <tr>
                <td><strong>Opening Date:</strong></td>
                <td>{new Date(modalGrant.opening_date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Closing Date:</strong></td>
                <td>{new Date(modalGrant.closing_date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Keywords:</strong></td>
                <td>{modalGrant.keywords.join(', ')}</td>
              </tr>
              <tr>
                <td><strong>Description:</strong></td>
                <td>{modalGrant.description}</td>
              </tr>
            </tbody>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
          <Button onClick={onClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  } 