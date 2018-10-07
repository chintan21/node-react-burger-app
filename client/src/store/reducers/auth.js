import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  authRedirect: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });

    case actionTypes.LOGOUT_START:
      return updateObject(state, { loading: true });

    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        error: null,
        loading: false
      });

    case actionTypes.AUTH_FAIL:
      console.log(action);
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.LOGOUT_SUCCESS:
      return updateObject(state, {
        token: null,
        authRedirect: '/',
        loading: false
      });

    case actionTypes.NOT_LOGGED_IN:
      return updateObject(state, {
        token: null
      });

    case actionTypes.SET_AUTH_REDIRECT:
      return updateObject(state, { authRedirect: action.path });

    default:
      return state;
  }
};

export default reducer;
