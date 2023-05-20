import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
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

const itemData = [
  {
    img: require('../../images/landscape/20230128_1.JPG'),
    title: '20230128_1',
  },
  {
    img: require('../../images/landscape/20230128_2.JPG'),
    title: '20230128_2',
  },
  {
    img: require('../../images/landscape/20230128_3.JPG'),
    title: '20230128_3',
  },
  {
    img: require('../../images/landscape/20230128_4.JPG'),
    title: '20230128_4',
  },
  {
    img: require('../../images/landscape/20230128_5.JPG'),
    title: '20230128_5',
  },
  {
    img: require('../../images/landscape/20230128_6.JPG'),
    title: '20230128_6',
  },
  {
    img: require('../../images/landscape/20230128_7.JPG'),
    title: '20230128_7',
  },
  {
    img: require('../../images/landscape/20230128_8.JPG'),
    title: '20230128_8',
  },
  {
    img: require('../../images/landscape/20230128_9.JPG'),
    title: '20230128_9',
  },
  {
    img: require('../../images/landscape/20230128_10.JPG'),
    title: '20230128_10',
  },
  {
    img: require('../../images/landscape/20230402_1.JPG'),
    title: '20230402_1',
  },
  {
    img: require('../../images/landscape/20230402_2.JPG'),
    title: '20230402_2',
  },
  {
    img: require('../../images/landscape/20230402_3.JPG'),
    title: '20230402_3',
  },
  {
    img: require('../../images/landscape/20230402_4.JPG'),
    title: '20230402_4',
  },
  {
    img: require('../../images/landscape/20230402_5.JPG'),
    title: '20230402_5',
  },
  {
    img: require('../../images/landscape/20230402_6.JPG'),
    title: '20230402_6',
  },
  {
    img: require('../../images/landscape/20230402_7.JPG'),
    title: '20230402_7',
  },
  {
    img: require('../../images/landscape/20230402_8.JPG'),
    title: '20230402_8',
  },
  {
    img: require('../../images/landscape/20230402_9.JPG'),
    title: '20230402_9',
  },
];
