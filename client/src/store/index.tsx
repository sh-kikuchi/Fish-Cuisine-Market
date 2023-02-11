import { configureStore } from "@reduxjs/toolkit"
import { initialState as countInitialState, countReducer } from '../slices/countSlice'
import { storeState as storeInitialState, storeReducer } from '../slices/storeSlice'
import { menuState as menuInitialState, menuReducer } from '../slices/menuSlice'
import { eatLogState as eatLogInitialState, eatLogReducer } from '../slices/eatLogSlice'
import { userState as userInitialState, userReducer } from '../slices/userSlice'
import { imageState as imageInitialState, imageReducer } from '../slices/imageSlice'
import { referenceState as referenceInitialState, referenceReducer } from '../slices/referenceSlice'


export class RootState {
  count = countInitialState
  store = storeInitialState
  menu = menuInitialState
  eatLog = eatLogInitialState
  user = userInitialState
  image = imageInitialState;
  reference = referenceInitialState;
}

//reducer
const reducer = {
  count: countReducer,
  store: storeReducer,
  menu: menuReducer,
  eatLog: eatLogReducer,
  user: userReducer,
  image: imageReducer,
  reference: referenceReducer
}

//store
const store = configureStore({
  reducer
})

export default store;
