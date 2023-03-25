import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { Button, Container, Stack, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

function AuthView() {
  //store
  const user = useSelector((state: any) => state.user.data);
  const dispatch = useDispatch();

  //useState
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mode, setMode] = useState('');
  const [isInit, setIsInit] = useState(true);
  const [message, setMessage] = useState('');


  //レンダリングされた後に実行
  useEffect(() => {
    if (isInit) {
      //モードチェンジ（ログイン画面/新規登録画面/編集画面）
      const location = window.location.pathname;
      switch (location) {
        case '/login':
          setMode('login');
          break;
        case '/register':
          setMode('register');
          break;
        case '/edit':
          setMode('edit');
          getUser(dispatch);
          break;
      }
    }
    console.log('mode: ' + mode);
    setIsInit(false);

  });

  //ログイン
  const handleClickLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };

    await axios.post("http://localhost:3001/login", formData)
      .then(function (response) {
        if (response.status === 200) {
          document.cookie = "access_token=" + JSON.stringify(response.data.token);
          localStorage.setItem("data", JSON.stringify(response.data.token));
          return window.location.href = "/" //React-router使えたらそうする
        }
      })
      .catch(function (error) {
        console.log(error);
        setEmail('');
        setPassword('');
        setMessage(error.response.data.message);
      });
  }

  //新規登録
  const handleClickRegister = async () => {
    const formData = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    await axios.post("http://localhost:3001/register", formData)
      .then(function (response) {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setMessage(error.response.data.message);
      });
  }

  //更新処理
  const handleClickEdit = async () => {
    const formData = {
      userid: user.id,
      username: username,
      email: email,
      password: password,
      newPassword: newPassword,
    };
    await axios.post("http://localhost:3001/auth/edit", formData)
      .then(function (response) {
        setPassword('');
        setNewPassword('');
        document.cookie = "access_token=" + JSON.stringify(response.data.token);
        localStorage.setItem("data", JSON.stringify(response.data.token));
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setPassword('');
        setNewPassword('');
        setMessage(error.response.data.message);
      });
  }
  return (
    <div className="AuthView">
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Box textAlign="center" sx={{ mb: 2 }} fontSize={20}>
          {mode === 'login' ? "ログイン" : mode === 'register' ? "新規登録" : mode === 'edit' ? "編集画面" : ""}
        </Box>
        <Box textAlign="center" sx={{ mb: 5, color: 'red' }} fontSize={16}>
          {message ? message : ''}
          {/* {validation ? validation : []} */}
        </Box>
        <Stack spacing={3}>
          {(mode === 'register' || mode === 'edit') &&
            <TextField
              required
              label="ユーザー名"
              value={user.username}
              onChange={(event) => setUsername(event.target.value)} />
          }
          <TextField
            required
            label="メールアドレス"
            value={user.email}
            onChange={(event) => setEmail(event.target.value)} />
          <TextField
            required
            label="パスワード"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          {(mode === 'register' || mode === 'edit') &&
            <TextField
              required
              label={mode === 'register' ? "パスワード(確認用)" : "新パスワード"}
              type="password"
              value={mode === 'register' ? passwordConfirm : mode === 'edit' ? newPassword : ""}
              onChange={(event) =>
                mode === 'register' ? setPasswordConfirm(event.target.value) :
                  mode === 'edit' ? setNewPassword(event.target.value) : undefined
              } />
          }
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={
              mode === 'login' ? handleClickLogin
                : mode === 'register' ? handleClickRegister
                  : mode === 'edit' ? handleClickEdit
                    : undefined
            }
          >
            {mode === 'login' ? "ログイン" : mode === 'register' ? "新規登録" : mode === 'edit' ? "更新する" : ""}
          </Button>
        </Stack>
        <Box textAlign="right" sx={{ mt: 5 }} fontSize={16}>
          {mode === 'login' && <a href="/register">新規登録はこちら</a>}
          {mode === 'register' && <a href="/login">ログインはこちら</a>}
        </Box>
      </Container>
    </div>
  );
}
export default AuthView;
