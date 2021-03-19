import CreateAppContext from './CreateAppContext';
// import {GOOGLE_API_KEY} from 'react-native-dotenv'
import {LOG_IN, LOG_OUT,PIN_QRCODE} from './actionTypes';

const initialState = {
  user: null,
  buildings: null,
  pinnedBuilding: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, user: action.payload};
    case LOG_OUT:
      return {...state, user: action.payload};
    case PIN_QRCODE:
      return {...state, pinnedBuilding:action.payload}
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
      type: LOG_OUT,
      payload: null,
    });
  } catch (error) {
    throw error;
  }
};

const pinQRCode=(dispatch)=> async(payload)=>{
  try {
    dispatch({
      type: PIN_QRCODE,
      payload: payload,
    });
  } catch (error) {
    throw error;
  }
}

export const {Provider, Context} = CreateAppContext(
  eventReducer,
  {
    login,
    logout,
    pinQRCode,
  },
  initialState,
);
