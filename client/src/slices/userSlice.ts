
import { createSlice } from "@reduxjs/toolkit";
interface userState {
  userid: number;
}
export const userState = {
  userid: 0,
}
/**
 * createSlice:reducerとactionsをまとめる
 */
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
/**
 * ユーザー情報取得
 * @param dispatch
 */
export const getUser = async (dispatch: any) => {
  let jwt = localStorage.getItem('data') ? localStorage.getItem('data') : '';
  jwt = jwt ? JSON.parse(jwt) : '';
  const accessToken: any = { accessToken: jwt };
  if (!jwt || jwt === null || jwt === undefined) {
    window.location.href = "/login"
  }
  const method = "POST";
  const body = JSON.stringify(accessToken);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/auth/show", { method, headers, body, credentials: 'include' })
    .then((res) =>
      res.json()
    ).then((data) => {
      dispatch(setUser(data));
    })
    .catch(function () {
      location.href = '/login'
    }
    );
};
/**
 * actionとreducerのエクスポート
 */
export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
