import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { getImages } from '../../slices/imageSlice'
import { getReferenceDetail } from '../../slices/referenceSlice'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

function MealPicturePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const image = useSelector((state: any) => state.image.data);
  const reference = useSelector((state: any) => state.reference.data);
  const [open, setOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [menuName, setMenuName] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState('0');
  const [fileName, setFileName] = useState('');

  //breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
      href="/">
      TOP
    </Link>,
    <Typography key="3" color="text.primary">
      お魚（定食）図鑑
    </Typography>,
  ];

  useEffect(() => {
    let jwt = localStorage.getItem('data') ? localStorage.getItem('data') : '';
    jwt = jwt ? JSON.parse(jwt) : '';
    const accessToken = { accessToken: jwt };
    if (accessToken) {
      getUser(dispatch, accessToken);
      getImageData();
    }
  }, [user.id]);

  const getImageData = () => {
    if (user.id) {
      getImages(dispatch, user.id);
    }
  };

  const handleOpen = (eatlogid: any) => (e: any) => {
    getReferenceDetail(dispatch, eatlogid);
    if (reference && reference.length) {
      setStoreName(reference[0].storename);
      setMenuName(reference[0].menuname);
      setText(reference[0].text);
      setDate(reference[0].date);
      setRating(reference[0].rating);
      setFileName(reference[0].filename);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStoreName('');
    setMenuName('');
    setText('');
    setDate('');
    setRating('0');
    setFileName('');
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Container maxWidth="md" sx={{ height: '100vh', margin: '20px auto' }}>
        <Box textAlign="center" fontSize={24}>
          お魚定食図鑑
        </Box>
        <ImageList sx={{ width: 600, height: 400, margin: '0 auto' }} cols={3} rowHeight={164} >
          {image.map((item: any) => (
            <ImageListItem key={item.id}>
              <img
                src={require(`../../images/${item.filename}?w=164&h=164&fit=crop&auto=format`)}
                // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.eatlog_id}
                loading="lazy"
                onClick={handleOpen(item.eatlog_id)}
              />
            </ImageListItem>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Card variant="outlined">
                {fileName !== '' ?
                  <Container component="div" className="m-auto" >
                    <img
                      src={require(`../../images/${fileName}`)}
                      // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={fileName}
                      width={180}
                      height={180}
                      className="object-contain h-2/5 m-auto"

                    />
                  </Container> : null
                }
                <CardContent>
                  Date: {date.substr(0, 9)} / Store: {storeName}
                  <Typography gutterBottom variant="h3" component="div">
                    {menuName}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={Number(rating)}
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleClose} > Close</Button>
                </CardActions>
              </Card>
            </Box>
          </Modal>
        </ImageList>
      </Container >
    </div>
  );
}
export default MealPicturePage;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: '../../images/1674482177886-41p7j5-home.png',
    title: 'Bike',
  },
];
