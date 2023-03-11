

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { deleteEatLogs, getEatLogs } from '../../slices/eatLogSlice'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';


const columns: GridColDef[] = [
  { field: 'date', headerName: '日付', width: 200 },
  { field: 'text', headerName: '感想', minWidth: 1000 },
  { field: 'rating', headerName: '★', width: 100 },
];

// function FormList(props: Props) {
function EatLogListPage() {

  //get QueryParams
  const { storeid } = useParams();
  const { menuid } = useParams();

  const [init, setInit] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const eatLog = useSelector((state: any) => state.eatLog.data);
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
      食事記録一覧
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
    if (user.id && storeid && menuid) {
      getEatLogs(dispatch, storeid, menuid);
      setInit(false);
    }
  };

  const rows = eatLog;


  const handleDeleteRows = () => {
    console.log('handleDeleteRows is called');
    if (selectionModel.length === 0) {
      alert("お店を選択して下さい");
      return;
    };
    deleteEatLogs(dispatch, selectionModel, storeid, menuid);
  }

  const handleMoveDetailPage = () => {
    console.log('handleMoveDetailPage is called');
    if (selectionModel.length === 0 || selectionModel.length > 1) {
      alert("お店を1つ選択して下さい");
      return;
    }
    window.location.href = "/eatLog/detail/" + storeid + '/' + menuid + '/' + selectionModel[0];
  }
  const handleMoveRegisterEatLogPage = () => {
    console.log('handleMoveRegisterEatLogPage is called');
    window.location.href = "/eatLog/register/" + storeid + '/' + menuid;
  }
  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Box textAlign="center" fontSize={24}>
        食事記録一覧
      </Box>
      <Box component='div' sx={{
        p: 2, display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Box component='div'>
          <Tooltip title="画面へ遷移する" placement="top">
            <Button
              variant="text"
              color='secondary'
              sx={{ margin: 1 }}
              onClick={handleMoveRegisterEatLogPage}>
              食事記録を追加する
            </Button>
          </Tooltip>
        </Box>
        <Box component='div'>
          <Tooltip title="1つ選択" placement="top">
            <Button
              variant="contained"
              color='primary'
              sx={{ margin: 1 }}
              onClick={handleDeleteRows}>
              削除
            </Button>
          </Tooltip>
          <Tooltip title="複数" placement="top">
            <Button
              variant="contained"
              color='error'
              sx={{ margin: 1 }}
              onClick={handleMoveDetailPage}>
              詳細
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
    </div >
  );
}
export default EatLogListPage;
