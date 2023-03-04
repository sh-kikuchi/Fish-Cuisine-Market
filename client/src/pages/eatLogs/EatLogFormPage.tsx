import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { registerEatLog, getEatLogDetail, updateEatLog } from '../../slices/eatLogSlice'
import { getUser } from '../../slices/userSlice'
import { getStoreDetail } from '../../slices/storeSlice'
import { getMenuDetail } from '../../slices/menuSlice'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

function EatLogFormPage() {
  //get QueryParams
  const { storeid } = useParams();
  const { menuid } = useParams();
  const { eatlogid } = useParams();

  const dispatch = useDispatch();

  //global
  const user = useSelector((state: any) => state.user.data);
  const store = useSelector((state: any) => state.store.data);
  const menu = useSelector((state: any) => state.menu.data);
  const eatLog = useSelector((state: any) => state.eatLog.data);

  //local
  const [init, setInit] = useState(true);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState('0');
  const [imageFile, setImageFile] = useState<any | null>(null)
  const [value, setValue] = React.useState<number | null>(2);

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
        window.location.href = "/eatLog/list/" + storeid + "/" + menuid;
      }}
    >
      食事記録一覧
    </Link >,
    <Typography key="3" color="text.primary">
      食事記録マスタ
    </Typography>,
  ];

  useEffect(() => {
    let jwt = localStorage.getItem('data') ? localStorage.getItem('data') : '';
    jwt = jwt ? JSON.parse(jwt) : '';
    const accessToken = { accessToken: jwt };
    if (init === true && accessToken) {
      getUser(dispatch, accessToken);
      getData(accessToken);
    }
  }, [user.id]);

  //
  const getData = async (accessToken: any) => {
    if (init === true && user.id && storeid && menuid && eatlogid) {
      getEatLogDetail(dispatch, storeid, menuid, eatlogid)
    }
  }

  if (init && eatLog.length !== 0) {
    alert(eatLog[0].date.substr(0, 10));
    setText(eatLog[0].text);
    setDate(eatLog[0].date.substr(0, 10));
    setRating(eatLog[0].rating);
    setValue(eatLog[0].rating);
    setInit(false);
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setImageFile(e.target.files);
  };

  const handleRegisterEatLog = () => {
    if (!imageFile) {
      alert("画像をアップロードして下さい");
    }
    const formData = new FormData();
    formData.append("file", imageFile[0]);

    const postData = {
      storeid: Number(storeid), //2
      menuid: Number(menuid), //1
      text: text,
      date: date,
      rating: rating,
      file: formData,
      userid: Number(user.id)
    };
    registerEatLog(dispatch, postData, formData);
  }

  const handleUpdateEatLog = () => {

    const formData = new FormData();
    if (imageFile !== null) {
      formData.append("file", imageFile[0]);
    }
    const postData = {
      storeid: Number(storeid),
      menuid: Number(menuid),
      eatlogid: Number(eatlogid),
      text: text,
      date: date,
      rating: rating,
      file: formData,
      userid: Number(user.id)
    };
    updateEatLog(dispatch, postData, formData);
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
          感想
        </Box>
        <TextField
          type="date"
          id="outlined-basic"
          variant="outlined"
          label=" 日付"
          value={date}
          fullWidth
          sx={{ margin: '10px auto' }}
          onChange={(event) => setDate(event.target.value)}
        />
        <Typography component="legend">星いくつ？</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setRating(String(newValue));
          }}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="感想をどうぞ"
          value={text}
          fullWidth
          sx={{ margin: '10px auto' }}
          placeholder="50字以内"
          onChange={(event) => setText(event.target.value)}
        />
        添付ファイル
        <div>
          <input
            type="file"
            name="myFile"
            onChange={(event => onFileInputChange(event))}
          />
        </div>

        <Box sx={{ minWidth: '300', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={eatlogid !== undefined || eatlogid != null
              ? handleUpdateEatLog
              : handleRegisterEatLog
            }>登録する
          </Button>
        </Box>
      </Container>
    </div>
  );
}
export default EatLogFormPage;
