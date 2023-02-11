
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  userid: number;
}

export const userState = {
  userid: 0,
}


//createSlice:reducerとactionsをまとめる
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    status: "",
    error: {}
  },
  reducers: {

    setUser: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const getUser = async (dispatch: any, data: any) => {
  const method = "POST";
  const body = JSON.stringify(data);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/auth/show", { method, headers, body })
    .then((res) =>
      //console.log(res.json());
      res.json()
    ).then((data) => {
      dispatch(setUser(data));
    })
    .catch(function () {
      location.href = '/login'
    }
    );
};

//export(actions/reducer)
export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
