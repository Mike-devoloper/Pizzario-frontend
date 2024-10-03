import { Button, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import '../css/app.css';

function App() {
  return <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{my: 4}}>
          <Typography variant='h4' component={"h4"}>
            Create React App on TypeScript with Redux
          </Typography>
        </Box>
        <Button variant="contained">Contained</Button>
      </Stack>
  </Container>
}

export default App;
