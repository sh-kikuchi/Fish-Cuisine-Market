
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface storeState {
  userid: number;
  storeName: string;
  address1: string;
  address2: string;

}

export const storeState = {
  userid: 0,
  storeName: "",
  address1: "",
  address2: "",

}


//createSlice:reducerとactionsをまとめる
const storeSlice = createSlice({
  name: 'stores',
  initialState: {
    data: [],
    status: "",
    error: {}
  },
  reducers: {
    setStores: (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.stores;

    },
    //actions(){fn()}
    // incrementCount(state) {
    //   state.count++
    // },
    // decrementCount(state) {
    //   state.count--
    // }
  }
});

export const registerStore = async (dispatch: any, data: any) => {
  console.log(data);
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/store/register", { method, headers, body })
    .then((res) =>
      window.location.href = '/'
    ).catch(console.error);
};


//get store data
export const getStores = async (dispatch: any, param: string) => {
  const params = { userid: param };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/store/show?${query}`);
  const data = await response.json();
  if (data.stores.length !== 0) {
    dispatch(setStores(data));
  }
};

//get store data
export const getStoreDetail = async (dispatch: any, userid: string, storeid: string) => {
  const params = { userid: userid, storeid: storeid };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/store/detail?${query}`);
  const data = await response.json();
  if (data.stores.length !== 0) {
    dispatch(setStores(data));
  }
};

//get store data
export const updateStore = async (dispatch: any, data: any) => {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/store/update", { method, headers, body })
    .then((res) =>
      window.location.href = '/store/list'
    )
    .catch(console.error);
};

//get store data
export const deleteStore = async (dispatch: any, params: any) => {
  const postData = { storeidArray: params };
  const method = "POST";
  const body = JSON.stringify(postData);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/store/delete", { method, headers, body })
    .then((res) =>
      window.location.href = '/store/list'
    )
    .catch(console.error);
};

//export(actions/reducer)
export const { setStores } = storeSlice.actions
export const storeReducer = storeSlice.reducer
