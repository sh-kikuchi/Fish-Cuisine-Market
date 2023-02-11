
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface imageState {
  userid: number;
  storeName: string;
  address1: string;
  address2: string;
  option: string;
}

export const imageState = {
  userid: 0,
  storeName: "",
  address1: "",
  address2: "",
  option: ""
}


//createSlice:reducerとactionsをまとめる
const imageSlice = createSlice({
  name: 'images',
  initialState: {
    data: [],
    status: "",
    error: {}
  },
  reducers: {
    setImages: (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.images;
    },
  }
});

//get store data
export const getImages = async (dispatch: any, param: string) => {
  const params = { userid: param };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/file/show?${query}`);
  const data = await response.json();
  if (data.images.length !== 0) {
    dispatch(setImages(data));
  }
};


//export(actions/reducer)
export const { setImages } = imageSlice.actions
export const imageReducer = imageSlice.reducer
