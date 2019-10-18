import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import logoutReducer from "./logoutReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  clean_messages: logoutReducer,
  profile: profileReducer
});
