import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import itemData from '../../config/imageList'
import { Stack, Typography } from '@mui/material';

function LandscapePage() {
  //breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
      href="/">
      TOP
    </Link>,
    <Typography key="3" color="text.primary">
      豊洲憧憬
    </Typography>,
  ];
  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Container maxWidth="md" sx={{ height: '100vh', margin: '10px auto' }}>
        <Box textAlign="center" fontSize={24}>
          豊洲憧憬
        </Box>
        <ImageList sx={{ width: 600, height: 400, margin: '0 auto' }} cols={3} rowHeight={190} >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </div>
  );
}
export default LandscapePage;
