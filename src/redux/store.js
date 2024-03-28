import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

//const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = configureStore({
  reducer: rootReducer,
//   composeEnhancers
});

export default store;