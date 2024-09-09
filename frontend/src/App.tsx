import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Box, AppBar, Toolbar, Button } from '@mui/material';
import { backend } from 'declarations/backend';

interface CoinInfo {
  totalSupply: bigint;
  currentPrice: number;
  holders: bigint;
}

const App: React.FC = () => {
  const [coinInfo, setCoinInfo] = useState<CoinInfo | null>(null);

  useEffect(() => {
    fetchCoinInfo();
  }, []);

  const fetchCoinInfo = async () => {
    try {
      const result = await backend.getCoinInfo();
      setCoinInfo(result);
    } catch (error) {
      console.error('Error fetching coin info:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MICROSOFT MEMECOIN
          </Typography>
          <Button color="inherit">Buy</Button>
          <Button color="inherit">Whitepaper</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to MICROSOFT MEMECOIN
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Total Supply</Typography>
                <Typography variant="h4">{coinInfo?.totalSupply.toString() || 'Loading...'}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Current Price</Typography>
                <Typography variant="h4">${coinInfo?.currentPrice.toFixed(4) || 'Loading...'}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Holders</Typography>
                <Typography variant="h4">{coinInfo?.holders.toString() || 'Loading...'}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default App;
