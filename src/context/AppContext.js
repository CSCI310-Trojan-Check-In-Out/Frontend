import CreateAppContext from './CreateAppContext';
// import {GOOGLE_API_KEY} from 'react-native-dotenv'
import {LOG_IN, LOG_OUT} from './actionTypes';

const initialState = {
  user: null,
  buildings: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, user: action.payload};
    case LOG_OUT:
      return {...state, user: action.payload};
    default:
      return state;
  }
};

const login = (dispatch) => async (payload) => {
  try {
    dispatch({
      type: LOG_IN,
      payload: payload,
    });
  } catch (error) {
    throw error;
  }
};

const logout = (dispatch) => async () => {
  try {
    dispatch({
      type: LOG_IN,
      payload: null,
    });
  } catch (error) {
    throw error;
  }
};

export const {Provider, Context} = CreateAppContext(
  eventReducer,
  {
    login,
    logout,
  },
  initialState,
);
