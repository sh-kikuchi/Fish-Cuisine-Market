import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { registerStore, getStoreDetail, updateStore } from '../../slices/storeSlice'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

function StoreFormPage() {
  const [storeName, setStoreName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [init, setInit] = useState(true);

  const store = useSelector((state: any) => state.store.data);
  const user = useSelector((state: any) => state.user.data);

  const { storeid } = useParams();

  const dispatch = useDispatch();

  //breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
      href="/">
      TOP
    </Link>,
    <Link underline="hover" key="1" color="inherit"
      href="/store/list">
      お店一覧
    </Link>,
    <Typography key="3" color="text.primary">
      お店マスタ
    </Typography>,
  ];
  useEffect(() => {
    getUser(dispatch);
    getStoreData();
  }, [user.id]);

  const getStoreData = () => {
    if (user.id && storeid) {
      getStoreDetail(dispatch, user.id, storeid);
    }
  };

  const handleRegisterStore = () => {
    const formData = {
      userid: Number(user.id),
      storeName: storeName,
      address1: address1,
      address2: address2,

    };
    registerStore(dispatch, formData);
  }

  if (init && store.length !== 0) {
    setStoreName(store[0].name);
    setAddress1(store[0].address1);
    setAddress2(store[0].address2);
    setInit(false);
  }

  const handleUpdateStore = () => {
    const formData = {
      storeid: Number(storeid),
      userid: Number(user.id),
      storeName: storeName,
      address1: address1,
      address2: address2,

    };
    updateStore(dispatch, formData);
  }

  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Container maxWidth="md" sx={{ height: '100vh', margin: '10px auto' }}>
        <Box textAlign="center" fontSize={24}>
          お店マスタ
        </Box>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="店名"
          value={storeName}
          fullWidth
          sx={{ margin: '10px auto' }}
          placeholder="50字以内"
          onChange={(event) => setStoreName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="アドレス1(都道府県）"
          value={address1}
          fullWidth
          sx={{ margin: '10px auto' }}
          onChange={(event) => setAddress1(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="アドレス2(市町村以降）"
          value={address2}
          fullWidth
          sx={{ margin: '10px auto' }}
          placeholder="50字以内"
          onChange={(event) => setAddress2(event.target.value)}
        />
        <Box sx={{ minWidth: '300', display: 'flex', justifyContent: 'center' }}>

          <Button variant="contained"
            onClick={storeid !== undefined ? handleUpdateStore : handleRegisterStore}>登録する
          </Button>
        </Box>
      </Container >
    </div>
  );
}
export default StoreFormPage;
