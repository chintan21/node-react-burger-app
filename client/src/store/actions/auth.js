import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const logoutStart = () => {
  return {
    type: actionTypes.LOGOUT_START
  };
};

const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const logout = () => dispatch => {
  dispatch(logoutStart());
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: token
    }
  };

  axios
    .delete('/api/logout', config)
    .then(() => {
      localStorage.removeItem('token');
      dispatch(logoutSuccess());
    })
    .catch(() => {});
};

export const notLoggedIn = () => {
  return {
    type: actionTypes.NOT_LOGGED_IN
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password
    };
    let url = `/api/signup`;
    if (!isSignup) {
      url = '/api/login';
    }
    axios
      .post(url, authData)
      .then(res => {
        localStorage.setItem('token', res.headers.authorization);
        dispatch(authSuccess(res.headers.authorization));
      })
      .catch(err => {
        let message;
        if (typeof err.response.data.error.errors !== 'undefined') {
          message = err.response.data.error.errors.email.message;
        } else {
          message = err.response.data.error;
        }
        dispatch(authFail(message));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path
  };
};

export const checkAuth = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(notLoggedIn());
    } else {
      dispatch(authSuccess(token));
    }
  };
};
