import CreateAppContext from './CreateAppContext';
// import {GOOGLE_API_KEY} from 'react-native-dotenv'
import {LOG_IN, LOG_OUT, DELETE_ACCOUNT, PIN_QRCODE, REMOVE_QRCODE} from './actionTypes';

interface DataStore {
  user: any | null;
  buildings: any | null;
  pinnedBuilding: PinnedBuilding | null;
}

interface PinnedBuilding {
  building: any;
  QRCode: string;
}

const initialState: DataStore = {
  user: null,
  buildings: null,
  pinnedBuilding: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, user: action.payload};
    case LOG_OUT:
      return {initialState};
    case DELETE_ACCOUNT:
      return {initialState};
    case PIN_QRCODE:
      return {...state, pinnedBuilding: action.payload};
    case REMOVE_QRCODE:
      return {...state, pinnedBuilding: action.payload};
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

const deleteAccount = (dispatch) => async () => {
  try {
    dispatch({
      type: DELETE_ACCOUNT,
      payload: null,
    });
  } catch (error) {
    throw error;
  }
};

const pinQRCode = (dispatch) => async (payload) => {
  try {
    dispatch({
      type: PIN_QRCODE,
      payload: payload,
    });
  } catch (error) {
    throw error;
  }
};

const removeQRCode = (dispatch) => async () => {
  try {
    dispatch({
      type: REMOVE_QRCODE,
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
    deleteAccount,
    pinQRCode,
    removeQRCode,
  },
  initialState,
);
