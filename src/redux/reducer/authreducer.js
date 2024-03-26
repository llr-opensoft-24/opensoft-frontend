import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAILURE, SET_TOKEN } from "../actions/index";

const initialState = {
  isLoggedIn: false,
  token: null,
  userData: null,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        userData: action.userData,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;