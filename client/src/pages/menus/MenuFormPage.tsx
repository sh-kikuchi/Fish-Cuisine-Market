import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { getStoreDetail } from '../../slices/storeSlice'
import { registerMenu, getMenuDetail, updateMenu } from '../../slices/menuSlice'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

function MenuFormPage() {
  // user.id, menuName, price, memo, option
  const [init, setInit] = useState(true);
  const [storeName, setStoreName] = useState('');
  const [menuName, setMenuName] = useState('');
  const [price, setPrice] = useState('0');
  const [memo, setMemo] = useState('');
  const [option, setOption] = useState('0');

  const { storeid } = useParams();
  const { menuid } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const store = useSelector((state: any) => state.store.data);
  const menu = useSelector((state: any) => state.menu.data);

  //breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
      href="/">
      TOP
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={() => {
        window.location.href = "/menu/list/" + storeid;
      }}
    >
      メニュー一覧
    </Link >,
    <Typography key="3" color="text.primary">
      メニューマスタ
    </Typography>,
  ];

  useEffect(() => {
    getUser(dispatch);
    getStoreMenuData();
  }, [user.id]);

  const getStoreMenuData = () => {
    //トークン取得
    if (user.id && storeid) {
      getStoreDetail(dispatch, user.id, storeid)
      if (menuid) {
        getMenuDetail(dispatch, storeid, menuid)
      }
    }
  };

  if (init && store.length !== 0 && menu.length !== 0) {
    setMenuName(menu[0].name);
    setPrice(menu[0].price);
    setMemo(menu[0].memo);
    setStoreName(store[0].name);
    setOption(menu[0].region_flg);
    setInit(false);
  } else if (init && store.length !== 0) {
    setStoreName(store[0].name);
    setInit(false);
  }

  const handleRegisterMenu = () => {
    const formData = {
      storeid: Number(storeid),
      menuName: menuName,
      price: Number(price),
      memo: memo,
      option: option,
    };
    registerMenu(dispatch, formData);
  }

  const handleUpdateMenu = () => {
    const formData = {
      storeid: Number(storeid),
      menuid: Number(menuid),
      menuName: menuName,
      price: Number(price),
      memo: memo,
      option: option,
    };
    updateMenu(dispatch, formData);
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
          メニューマスタ
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
          label="メニュー名"
          value={menuName}
          fullWidth
          sx={{ margin: '10px auto' }}
          placeholder="50字以内"
          onChange={(event) => setMenuName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="価格"
          value={price}
          fullWidth
          sx={{ margin: '10px auto' }}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={(event) => setPrice(event.target.value)}
        />
        <FormControl sx={{ minWidth: '100%', marginTop: '20px' }}>
          <FormLabel id="demo-radio-buttons-group-label">閉店フラグ</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={option}
            name="radio-buttons-group"
            onChange={(event) => setOption(event.target.value)}
          >
            <FormControlLabel value="0" control={<Radio />} label="豊洲直送" />
            <FormControlLabel value="1" control={<Radio />} label="豊洲直送ではない" />
            <FormControlLabel value="2" control={<Radio />} label="神のみぞ知る" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="メモ"
          value={memo}
          fullWidth
          sx={{ margin: '10px auto' }}
          placeholder="50字以内"
          onChange={(event) => setMemo(event.target.value)}
        />
        <Box sx={{ minWidth: '300', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={menuid !== undefined || menuid != null
              ? handleUpdateMenu
              : handleRegisterMenu}>登録する
          </Button>
        </Box>
      </Container>
    </div>
  );
}
export default MenuFormPage;
