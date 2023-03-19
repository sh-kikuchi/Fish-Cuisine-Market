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
    getUser(dispatch);
    getImageData();
  }, [user.id]);

  const getImageData = () => {
    if (user.id) {
      getImages(dispatch, user.id);
    }
  };

  const handleOpen = (eatlogid: any) => (e: any) => {
    getReferenceDetail(dispatch, eatlogid);
    if (reference && reference.length) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
                <Container component="div" className="m-auto" >
                  {reference.map((ref: any) => (
                    <img
                      src={require(`../../images/${ref.filename}?w=164&h=164&fit=crop&auto=format`)}
                      // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={ref.filename}
                      width={180}
                      height={180}
                      loading="lazy"
                      className="object-contain h-2/5 m-auto"
                    />
                  ))}
                </Container>
                <CardContent>
                  <Typography gutterBottom component="div">
                    Date:  {reference.map((ref: any) => ref.date.substr(0, 10))}
                  </Typography>
                  <Typography gutterBottom component="div">
                    Store:  {reference.map((ref: any) => ref.storename)}
                  </Typography>
                  <Typography gutterBottom variant="h3" component="div">
                    {reference.map((ref: any) => ref.menuname)}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={Number(reference.map((ref: any) => ref.rating))}
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    {reference.map((ref: any) => ref.text)}
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
