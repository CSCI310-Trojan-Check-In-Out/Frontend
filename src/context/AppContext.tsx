import CreateAppContext from './CreateAppContext';
// import {GOOGLE_API_KEY} from 'react-native-dotenv'
import {
  LOG_IN,
  LOG_OUT,
  DELETE_ACCOUNT,
  PIN_QRCODE,
  REMOVE_QRCODE,
  CHECK_IN,
  CHECK_OUT,
  CHANGE_PROFILE_PIC,
} from './actionTypes';

interface DataStore {
  user: any | null;
  buildings: any | null;
  pinnedBuilding: PinnedBuilding | null;
  checkedInBuilding: CheckedInBuilding | null;
}

interface PinnedBuilding {
  building: any;
  QRCode: string;
}

interface CheckedInBuilding {
  building: any;
  QRCode: string;
}

const initialState: DataStore = {
  user: null,
  buildings: null,
  pinnedBuilding: null,
  checkedInBuilding: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, user: action.payload};
    case LOG_OUT:
      return initialState;
    case DELETE_ACCOUNT:
      return initialState;
    case PIN_QRCODE:
      return {...state, pinnedBuilding: action.payload};
    case REMOVE_QRCODE:
      return {...state, pinnedBuilding: action.payload};
    case CHECK_IN:
      return {...state, checkedInBuilding: action.payload};
    case CHECK_OUT:
      return {...state, checkedInBuilding: action.payload};
    case CHANGE_PROFILE_PIC:
      return {
        ...state,
        user: {
          ...state.user,
          picture: action.payload,
        },
      };
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

const checkin = (dispatch) => async (payload) => {
  try {
    dispatch({
      type: CHECK_IN,
      payload: payload,
    });
  } catch (error) {
    throw error;
  }
};

const checkout = (dispatch) => async () => {
  try {
    dispatch({
      type: CHECK_OUT,
      payload: null,
    });
  } catch (error) {
    throw error;
  }
};

const changeProfileImage = (dispatch) => async (payload) => {
  try {
    dispatch({
      type: CHANGE_PROFILE_PIC,
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
    logout,
    deleteAccount,
    pinQRCode,
    removeQRCode,
    checkin,
    checkout,
    changeProfileImage,
  },
  initialState,
);
