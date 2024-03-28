export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USERDATA= "SET_USERDATA"

export const setData = (data) => ({
    type: SET_USERDATA,
    userData: data
})
export const loginSuccess = (data) => ({ 
    type: LOGIN_SUCCESS,
    userData: data
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