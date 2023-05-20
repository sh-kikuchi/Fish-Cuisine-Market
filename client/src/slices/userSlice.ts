
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
  const method = "POST";
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch("http://localhost:3001/auth/show", { method, headers, credentials: 'include' })
    .then((res) =>
      res.status === 200 ? res.json() : location.href = '/login'
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
