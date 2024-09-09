import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Box, AppBar, Toolbar, Button, Card, CardMedia, CardContent } from '@mui/material';
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

  const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEp0lEQVR4nO2dW4hcRRCGv91EjYmKN4wXvEYRb6Ao3kVFUVFfiuIFfBMUQcEHQUTxAbzggyiCPnlDUPBJ8QKKGBGNGo3GaNSsJhqNZhOTbEz2MtJ/YBhqpqfnnDM9013ngwLZhO6uv6b7dHVVdQ+0tLS0tLS0tLS0NJcFwCpgI7AdmAAOAoeAKWDGfqbs/4bt7962H1gPXAOcVLfxTWQhcCuwCfgLmM7xmQZ+BzYDtwHH1+2UJrAMeBzYAxxNEUCWT9pnN3AbcEzdzuolJwMvAZMFhJH2OQA8D5xUt/N6wTLgXWCqAjGyfQ4CrwLL63Z2XVwI/FCDGNk+PwKX1O34qlgEPAUcrlGMbJ9DwBN2r2g0FwHf9kCMbJ9vgEsb7fkErgZ2ZzhhGtgLfAq8ATxid+BrgTOBJRXYvgS4wGxcZ7Z/ZvdJEp/dwFWN8n4CK4GdKY6YAT4HHgSuA44r0abjgRuAjcAXKRMHOzPPnGsyZwI7Uhz/FXAnsLhiWxcBdwFfp9i+A1jRZEFWJPTZB4F1wLE12X4c8ADwR4L9vwEXNE2QS4E/Yxx9ALgf6PfAB33AA8D+GF/8AVzeJEHWxDj3F+DGHvkjjpuAPyN8MmY+aIQg98U49TngqB75I8pRzwK3R/jmniYIsjLGmfcmOHIWmLRR0WvAE8BDNhpbZ3PZq4EzgFNtaD3X5+iEUdhzMWKsTHDkLPAjcH/C/cEFw/YUwReBb1P+/giwDXgWuNVGhHlYDrwdcX95P0WQhQkP/5PAEym/+w54DLgMGMhh5wDwKvBDyqhsK3Bvzjn3wYiVzIMJgizNMOxNWqp+2eaQF+e0+QLg3ZRnz5vAKTltXxZh/8EEQRZnEORwxvLJlI3CRnLYfxrwXsqze3UBHwxF2H8gQZBjMwgymbFxNm2zgyI8GvOc+KjACpC7RhxIEKQ/gyBZy9+7bOhcFG8Vj7DlniIsiLB/MkGQWZtXJHFCxu+22UJkUa6PsH+PfVeEqCWgqQRBDsU8yIdsaSULg7YvUpQtEfaPF/TBYMQ1diUI8neMA84BfsvxjLi9wN9ybI9E2P9ngWtEXWNXgiBjMQ5YlXOJfHXOZZootkbYv72AIFFtMJYgyLaYX+zOsWE2bDtxRdkWYf+2At8ftY2xLUGQrTEOWF3gOXFHgRVWNxH2ry7w/VHX2JogyJcxDhhh7jeNZoFfgZsL2L8mwv4vC3w/6hpfJQjySYwDBnijoDBBm7xUwP4hG0Vl2f9xge+PusYnSYKkbR+/UlCUoE1eKGj/mzH2fljw+6Ou8X6SIJvTlhFsHWlvQWGCNnm+oP1nWRtl2b+p4PdHXWNzmiA7YpywxEY7RUUJ2uS5gvafYm2UZf+Ggt+fdo0daYJsSnHEkBUAKSJK0CbPFrT/5IgC62n2v1fw+9OusSlNkD22/h/HoJUAzStK0CZPFbR/0NoobZP9nYLfn3WNPVmCBLyS4ZBzrWZVHlGCNnmioP0nWhvF2f9ywX4/6xqvZAkSsDbDMefZq5F5RQna5LGC9gdtFGf/moL9ftY11mYJEvCIvRGbxoiVfs4jStAmD+fs9wdtFGf//QX7/axrPJIlSEtLS0tLS0tLS0sL/8N/oVJGUl2hR5EAAAAASUVORK5CYII=';
  const cryptoImageBase64 = 'data:image/png;base64,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';

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="center">
            <img src={logoBase64} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MICROSOFT MEMECOIN
            </Typography>
          </Box>
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
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              About MICROSOFT MEMECOIN
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={cryptoImageBase64}
                    alt="Cryptocurrency"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      The Future of Meme Finance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MICROSOFT MEMECOIN combines the power of memes with cutting-edge blockchain technology.
                      Join us in revolutionizing the world of decentralized finance!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={logoBase64}
                    alt="MICROSOFT MEMECOIN Logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Our Vision
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We aim to create a vibrant community-driven ecosystem where memes and finance intersect.
                      MICROSOFT MEMECOIN is not just a currency; it's a movement.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default App;
