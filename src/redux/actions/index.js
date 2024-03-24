export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_TOKEN = "SET_TOKEN";

export const loginSuccess = () => ({ 
    type: LOGIN_SUCCESS 
});
export const logout = () => ({ 
    type: LOGOUT 
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const setToken = (token) => ({ 
    type: SET_TOKEN, 
    payload: token
});