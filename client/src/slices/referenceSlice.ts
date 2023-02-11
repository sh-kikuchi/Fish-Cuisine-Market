
import { createSlice } from "@reduxjs/toolkit";

interface referenceState {
  storeName: string,
  menuName: string,
  text: string,
  date: string,
  rating: string,
  fileName: string,
}

export const referenceState = {
  storeName: '',
  menuName: '',
  text: "",
  date: "",
  rating: "0",
  fileName: ""
}

//createSlice:reducerとactionsをまとめる
const ReferenceSlice = createSlice({
  name: 'reference',
  initialState: {
    data: [],
    status: "",
    error: {}
  },
  reducers: {
    setReference: (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.reference;
    },
  }
});

//get store data
export const getReferenceDetail = async (dispatch: any, eatlogid: string) => {
  const params = { eatlogid: eatlogid };
  const query = new URLSearchParams(params);
  const response = await fetch(`http://localhost:3001/reference/detail?${query}`);
  const data = await response.json();
  console.log(data);
  if (data.reference && data.reference.length !== 0) {
    dispatch(setReference(data));
  }
};


//export(actions/reducer)
export const { setReference } = ReferenceSlice.actions
export const referenceReducer = ReferenceSlice.reducer
