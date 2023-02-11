

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { getStores } from '../../slices/storeSlice'
import { getEatLogs } from '../../slices/eatLogSlice'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';


const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  // { field: 'user_id', headerName: 'user_id', width: 0 },
  { field: 'id', headerName: 'ID' },
  { field: 'text', headerName: '感想', minWidth: 400 },
  { field: 'rating', headerName: '★の数', width: 100 },
  { field: 'date', headerName: '日付', width: 200 },
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

  useEffect(() => {
    let jwt = localStorage.getItem('data') ? localStorage.getItem('data') : '';
    jwt = jwt ? JSON.parse(jwt) : '';
    const accessToken = { accessToken: jwt };
    console.log(init);
    if (init === true && accessToken) {
      getUser(dispatch, accessToken);
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
    if (selectionModel.length === 0) return;
  }

  const handleMoveDetailPage = () => {
    console.log('handleDeleteRows is called');
    if (selectionModel.length === 0) return;
    window.location.href = "/eatLog/detail/" + storeid + '/' + menuid + '/' + selectionModel[0];
  }

  const handleMoveRegisterEatLogPage = () => {
    console.log('handleMoveRegisterEatLogPage is called');
    window.location.href = "/eatLog/register/" + storeid + '/' + menuid;
  }


  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Box textAlign="center" fontSize={24}>
        感想一覧
      </Box>
      <Box component='div' sx={{
        p: 2, display: 'flex',
        justifyContent: 'start',
      }}>
        <Button
          variant="contained"
          color='error'
          sx={{ margin: 1 }}
          onClick={handleDeleteRows}>
          削除
        </Button>
        <Button
          variant="contained"
          color='warning'
          sx={{ margin: 1 }}
          onClick={handleMoveDetailPage}>
          詳細
        </Button>
        <Button
          variant="contained"
          color='secondary'
          sx={{ margin: 1 }}
          onClick={handleMoveRegisterEatLogPage}>
          新規
        </Button>
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

export default EatLogListPage;
