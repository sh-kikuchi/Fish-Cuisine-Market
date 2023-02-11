import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function LandscapePage() {
  return (
    <Container maxWidth="md" sx={{ height: '100vh', margin: '10px auto' }}>
      <Box textAlign="center" fontSize={24}>
        豊洲憧憬
      </Box>
      <ImageList sx={{ width: 500, height: 500, margin: '0 auto' }} cols={3} rowHeight={164} >
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
];
