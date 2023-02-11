

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getMenus } from '../../slices/menuSlice';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';


const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  // { field: 'user_id', headerName: 'user_id', width: 0 },
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'メニュー名', width: 250 },
  { field: 'price', headerName: '価格' },
  { field: 'memo', headerName: '備考' },
];


// function FormList(props: Props) {
function MenuListPage() {
  //get QueryParams
  const { storeid } = useParams();

  const [userid, setUserid] = useState('');
  const [init, setInit] = useState(true);

  const dispatch = useDispatch();
  const menu = useSelector((state: any) => state.menu.data);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    let jwt = localStorage.getItem('data') ? localStorage.getItem('data') : '';
    jwt = jwt ? JSON.parse(jwt) : '';
    const accessToken = { accessToken: jwt };
    console.log(init);
    if (init === true && accessToken) {
      getUserData(accessToken);
    }
  });


  const getUserData = async (accessToken: any) => {
    //トークン取得
    await axios.post("http://localhost:3001/auth/show", accessToken)
      .then(function (response) {
        setUserid(response.data.id);
        if (userid && storeid) {
          getMenus(dispatch, storeid);
          setInit(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        window.location.href = "/login" //取得失敗時はログイン画面に戻る
      });

  };

  const rows = menu;

  const handleDeleteRows = () => {
    console.log('handleDeleteRows is called');
    if (selectionModel.length === 0) return;
  }

  const handleMoveEatLogPage = () => {
    console.log('handleDeleteRows is called');
    if (selectionModel.length === 0) return;
    window.location.href = "/eatLog/list/" + storeid + '/' + selectionModel[0];
  }

  const handleMoveDetailPage = () => {
    console.log('handleDeleteRows is called');
    if (selectionModel.length === 0) return;
    window.location.href = "/menu/detail/" + storeid + '/' + selectionModel[0];
  }

  const handleMoveRegisterMenuPage = () => {
    console.log('handleMoveRegisterMenuPage is called');
    window.location.href = "/menu/register/" + storeid;
  }

  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Box textAlign="center" fontSize={24}>
        メニュー一覧
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
          color='success'
          sx={{ margin: 1 }}
          onClick={handleMoveEatLogPage}>
          ログ
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
          onClick={handleMoveRegisterMenuPage}>
          新規作成
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

export default MenuListPage;
