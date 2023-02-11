
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface menuState {
  storeid: number,
  menuName: string,
  price: number,
  memo: string,
  option: string;

}

export const menuState = {
  storeid: 0,
  menuName: "",
  price: 0,
  memo: "",
  option: ""
}

//createSlice:reducerとactionsをまとめる
const menuSlice = createSlice({
  name: 'menus',
  initialState: {
    data: [],
    status: "",
    error: {}
  },
  reducers: {
    registerMenu(state, action: PayloadAction<menuState>) {
      axios.post("http://localhost:3001/menu/register", action.payload)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          // state.error = error;
        });
    },
    setMenus: (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.menus;
    },
  }
});

export const registerMenu = async (dispatch: any, data: any) => {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/menu/register", { method, headers, body })
    .then((res) =>
      window.location.href = '/menu/list/' + data.storeid
    ).catch(console.error);
}

//get store data
export const getMenus = async (dispatch: any, param: string) => {
  const params = { storeid: param };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/menu/show?${query}`);
  const data = await response.json();
  if (data.menus.length !== 0) {
    dispatch(setMenus(data));
  }
};

//get store data
export const getMenuDetail = async (dispatch: any, storeid: string, menuid: string) => {
  const params = { storeid: storeid, menuid: menuid };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/menu/detail?${query}`);
  const data = await response.json();
  if (data.menus.length !== 0) {
    dispatch(setMenus(data));
  }
};

//get store data
export const updateMenu = async (dispatch: any, data: any) => {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/menu/update", { method, headers, body })
    .then((res) =>
      window.location.href = '/menu/list/' + data.storeid
    )
    .catch(console.error);
};

//export(actions/reducer)
export const { setMenus } = menuSlice.actions
export const menuReducer = menuSlice.reducer
