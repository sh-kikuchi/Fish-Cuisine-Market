

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { getMenus, deleteMenus } from '../../slices/menuSlice';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'メニュー名', width: 250 },
  { field: 'price', headerName: '価格' },
  { field: 'memo', headerName: '備考', width: 500 },
];

function MenuListPage() {
  //get QueryParams
  const { storeid } = useParams();

  const [userid, setUserid] = useState('');
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const menu = useSelector((state: any) => state.menu.data);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

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
      メニュー一覧
    </Typography>,
  ];

  useEffect(() => {
    if (init === true) {
      getUser(dispatch);
      getData();
    }
  }, [user.id]);

  const getData = async () => {
    //トークン取得
    if (user.id && storeid) {
      getMenus(dispatch, storeid);
      setInit(false);
    }
  };

  const rows = menu;

  const handleDeleteRows = () => {
    console.log('handleDeleteRows is called');
    if (selectionModel.length === 0) {
      alert("メニューを選択して下さい");
      return;
    }
    deleteMenus(dispatch, selectionModel, storeid);
  }
  const handleMoveEatLogPage = () => {
    console.log('handleMoveEatLogPage is called');
    if (selectionModel.length === 0) {
      alert("メニューを1つ選択して下さい");
      return;
    };
    window.location.href = "/eatLog/list/" + storeid + '/' + selectionModel[0];
  }
  const handleMoveDetailPage = () => {
    console.log('handleMoveDetailPage is called' || selectionModel.length > 1);
    if (selectionModel.length === 0) {
      alert("メニューを1つ選択して下さい");
      return;
    };
    window.location.href = "/menu/detail/" + storeid + '/' + selectionModel[0];
  }
  const handleMoveRegisterMenuPage = () => {
    console.log('handleMoveRegisterMenuPage is called');
    window.location.href = "/menu/register/" + storeid;
  }

  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Box textAlign="center" fontSize={24}>
        メニュー一覧
      </Box>
      <Box component='div' sx={{
        p: 2, display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Box component='div'>
          <Tooltip title="1つ選択" placement="top">
            <Button
              variant="outlined"
              color='success'
              sx={{ margin: 1 }}
              onClick={handleMoveEatLogPage}>
              食事記録ページへ
            </Button>
          </Tooltip>
          <Tooltip title="画面へ遷移する" placement="top">
            <Button
              variant="text"
              color='secondary'
              sx={{ margin: 1 }}
              onClick={handleMoveRegisterMenuPage}>
              メニューを追加する
            </Button>
          </Tooltip>
        </Box>
        <Box component='div'>
          <Tooltip title="複数選択可" placement="top">
            <Button
              variant="contained"
              color='primary'
              sx={{ margin: 1 }}
              onClick={handleMoveDetailPage}>
              詳細
            </Button>
          </Tooltip>
          <Tooltip title="1つ選択" placement="top">
            <Button
              variant="contained"
              color='error'
              sx={{ margin: 1 }}
              onClick={handleDeleteRows}>
              削除
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        sx={{ marginX: 2 }}
        rowsPerPageOptions={[5]}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </div>
  );
}
export default MenuListPage;
