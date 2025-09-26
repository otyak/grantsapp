import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function DashboardStats({ stats }) {
  return (
    <Grid container spacing={2}>
      {/* Summary Cards */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Total Grants
          </Typography>
          <Typography variant="h4">
            {stats.total_grants}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Total Funding Available
          </Typography>
          <Typography variant="h4">
            ${stats.total_funding.toLocaleString()}
          </Typography>
        </Paper>
      </Grid>

      {/* Charts */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            Grants by Industry
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.by_industry}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            Grants by Status
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.by_status}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardStats;
