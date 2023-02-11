
import { createSlice } from "@reduxjs/toolkit";

interface eatLogState {
  storeid: number,
  menuid: number,
  text: string,
  date: string,
  rating: string,
}

export const eatLogState = {
  storeid: 0,
  menuid: 0,
  text: "",
  date: "",
  rating: "0",
}

//createSlice:reducerとactionsをまとめる
const EatLogSlice = createSlice({
  name: 'eatLogs',
  initialState: {
    data: [],
    status: "",
    error: {}
  },
  reducers: {
    setEatLogs: (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.eatLogs;
    },
  }
});

//get store data
export const getEatLogs = async (dispatch: any, storePrm: string, menuPrm: string) => {
  const params = { storeid: storePrm, menuid: menuPrm };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/eatLog/show?${query}`);
  const data = await response.json();
  if (data.eatLogs.length !== 0) {
    dispatch(setEatLogs(data));
  }
};

//get store data
export const getEatLogDetail = async (dispatch: any, storeid: string, menuid: string, eatlogid: string) => {
  const params = { storeid: storeid, menuid: menuid, eatlogid: eatlogid };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/eatLog/detail?${query}`);
  const data = await response.json();
  console.log(data);
  if (data.eatLogs && data.eatLogs.length !== 0) {
    dispatch(setEatLogs(data));
  }
};

export const updateEatLog = async (dispatch: any, data: any, file: any) => {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/eatLog/update", { method, headers, body })
    .then((res) =>
      file ? uploadFile(file, body) : null
    )
    .catch(console.error);
};

export const registerEatLog = async (dispatch: any, data: any, file: any) => {
  console.log(data);
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/eatLog/register", { method, headers, body })
    .then((res) =>
      uploadFile(file, body)
    ).catch(console.error);
};

const uploadFile = (file: any, data: any) => {
  const method = "POST";
  const body = file;
  const headers = {
    'Accept': 'application/json',
    //'Content-Type': 'multipart/form-data'
  };
  fetch("http://localhost:3001/image", { method, headers, body })
    .then((res) =>
      res.json()
    ).then((file) => {
      data = JSON.parse(data);
      const postData = {
        userid: data.userid,
        storeid: data.storeid,
        menuid: data.menuid,
        filename: file.filename
      }
      const method = "POST";
      const body = JSON.stringify(postData);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch("http://localhost:3001/file/register", { method, headers, body })
        .then((res) =>
          window.location.href = '/eatlog/list/' + data.storeid + '/' + data.menuid
        ).catch(console.error)
    })
    .catch(console.error)
}

//export(actions/reducer)
export const { setEatLogs } = EatLogSlice.actions
export const eatLogReducer = EatLogSlice.reducer
