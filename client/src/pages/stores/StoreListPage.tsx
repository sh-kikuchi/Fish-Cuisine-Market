

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { getStores, deleteStore } from '../../slices/storeSlice'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'name', headerName: '店名', width: 250 },
  { field: 'address1', headerName: '都道府県', width: 150 },
  { field: 'address2', headerName: '住所', width: 500 },
];

// function FormList(props: Props) {
function StoreListPage() {

  const user = useSelector((state: any) => state.user.data);
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state.store.data);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  //breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
      href="/">
      TOP
    </Link>,
    <Typography key="3" color="text.primary">
      お店一覧
    </Typography>,
  ];

  useEffect(() => {
    let jwt = localStorage.getItem('data') ? localStorage.getItem('data') : '';
    jwt = jwt ? JSON.parse(jwt) : '';
    const accessToken = { accessToken: jwt };
    if (accessToken) {
      getUser(dispatch, accessToken);
      getStoresData();
    }
  }, [user.id]);

  const getStoresData = async () => {
    if (user.id) {
      getStores(dispatch, user.id);
    }
  };

  const rows = store;

  const handleDeleteRows = () => {
    if (selectionModel.length === 0) {
      alert("お店を選択して下さい");
      return;
    };
    deleteStore(dispatch, selectionModel);
  }

  const handleMoveMenuPage = () => {
    if (selectionModel.length === 0 || selectionModel.length > 1) {
      alert("お店を1つ選択して下さい");
      return;
    }
    window.location.href = "/menu/list/" + selectionModel[0];
  }

  const handleMoveDetailPage = () => {
    if (selectionModel.length === 0 || selectionModel.length > 1) {
      alert("お店を1つ選択して下さい");
      return;
    }
    window.location.href = "/store/detail/" + selectionModel[0];
  }

  const handleMoveStoreDetailPage = () => {
    window.location.href = "/store/register";
  }

  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }}>
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Box textAlign="center" fontSize={24}>
        お店一覧
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
              onClick={handleMoveMenuPage}>
              メニューページへ
            </Button>
          </Tooltip>
          <Tooltip title="画面へ遷移する" placement="top">
            <Button
              variant="text"
              color='secondary'
              sx={{ mr: 2 }}
              onClick={handleMoveStoreDetailPage}>
              お店を追加する
            </Button>
          </Tooltip>
        </Box>
        <Box component='div'>
          <Tooltip title="1つ選択" placement="top">
            <Button
              variant="contained"
              color='primary'
              sx={{ margin: 1 }}
              onClick={handleMoveDetailPage}>
              編集
            </Button>
          </Tooltip>
          <Tooltip title="複数選択可" placement="top">
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
        pageSize={10}
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

export default StoreListPage;
