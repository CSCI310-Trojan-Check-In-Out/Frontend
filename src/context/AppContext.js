import CreateAppContext from './CreateAppContext';
// import {GOOGLE_API_KEY} from 'react-native-dotenv'
import {LOG_IN} from './actionTypes';

const initialState = {
  user: null,
  buildings: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
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

export const {Provider, Context} = CreateAppContext(
  eventReducer,
  {
    login,
  },
  initialState,
);