

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../../slices/userSlice'
import { getStores, deleteStore } from '../../slices/storeSlice'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  // { field: 'user_id', headerName: 'user_id', width: 0 },
  { field: 'name', headerName: '店名', width: 250 },
  { field: 'address1', headerName: '住所1', width: 200 },
  { field: 'address2', headerName: '住所2', width: 200 },
];


// function FormList(props: Props) {
function StoreListPage() {

  const user = useSelector((state: any) => state.user.data);

  const dispatch = useDispatch();
  const store = useSelector((state: any) => state.store.data);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

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
    if (selectionModel.length === 0) return;
    deleteStore(dispatch, selectionModel);
  }

  const handleMoveMenuPage = () => {
    if (selectionModel.length === 0 || selectionModel.length > 1) return;
    window.location.href = "/menu/list/" + selectionModel[0];
  }

  const handleMoveDetailPage = () => {
    if (selectionModel.length === 0 || selectionModel.length > 1) return;
    window.location.href = "/store/detail/" + selectionModel[0];
  }

  const handleMoveStoreDetailPage = () => {
    window.location.href = "/store/register";
  }


  return (
    <div style={{ height: 400, width: '100%' }} >
      <Box component='div' sx={{
        p: 2, display: 'flex',
        justifyContent: 'start',
      }}>
        <Button
          variant="contained"
          color='warning'
          sx={{ margin: 1 }}
          onClick={handleDeleteRows}>
          削除
        </Button>
        <Button
          variant="contained"
          color='success'
          sx={{ margin: 1 }}
          onClick={handleMoveMenuPage}>
          メニュー
        </Button>
        <Button
          variant="contained"
          color='error'
          sx={{ margin: 1 }}
          onClick={handleMoveDetailPage}>
          詳細
        </Button>
        <Button
          variant="contained"
          color='secondary'
          sx={{ margin: 1 }}
          onClick={handleMoveStoreDetailPage}>
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

export default StoreListPage;
