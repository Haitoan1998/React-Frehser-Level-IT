import { toast } from "react-toastify";
import { LoginUser } from "../../services/UserService";

export const USER_LOGIN = "USER_LOGIN";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REFRESH = "USER_REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    const res = await LoginUser(email.trim(), password.trim());
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("email ", email.trim());
      dispatch({
        type: FETCH_USER_SUCCESS,
        data: { email: email.trim(), token: res.token },
      });
      //   loginContext(email, res.token);
      toast.success("login success");
      //   nav("/");
    }
    if (res && res.status === 400) {
      dispatch({ type: FETCH_USER_ERROR });
      toast.error("email or password incorrect");
    }
  };
};
export const handleLogoutRedux = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
  };
};

export const handleRefresh = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
