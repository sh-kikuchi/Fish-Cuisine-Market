import { createSlice } from "@reduxjs/toolkit";

interface CountState {
  count: number
}

export const initialState: CountState = {
  count: 50,
}

//createSlice:reducerとactionsをまとめる
const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    //actions(){fn()}
    incrementCount(state) {
      state.count++
    },
    decrementCount(state) {
      state.count--
    }
  }
});

//export(actions/reducer)
export const { incrementCount, decrementCount } = counterSlice.actions
export const countReducer = counterSlice.reducer
