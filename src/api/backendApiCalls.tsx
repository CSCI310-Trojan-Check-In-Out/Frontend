import axios from 'axios';
import config from './config';
import {Context as AppContext} from '../context/AppContext';

const ACCOUNT_URL = `${config.URL_ENDPOINT}/account`;

// login
export function signinApi(
  email: any,
  password: any,
  successCallback: Function,
  failureCallback: Function,
) {
  const form = createFormData([
    ['email', email],
    ['password', password],
  ]);
  //   const form = new FormData();
  //   form.append('a', 111);

  axios({
    method: 'post',
    url: `${ACCOUNT_URL}/login`, //ACCOUNT_URL + 'login',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.status === 200) {
      const userData = res.data[0];
      successCallback(userData);
    } else {
      failureCallback();
    }
  });
}

// logout
// TODO: connect to backend
export function logoutApi(
  successCallback: Function,
  failureCallback: Function | null,
) {
  successCallback();
}
// delete account
// TODO: connect to backend
export function deleteAccountApi(
  successCallback: Function,
  failureCallback: Function | null,
) {
  successCallback();
}

// helpers
function createFormData(data: any[][2]) {
  const formData = new FormData();
  data.forEach((item: any[]) => {
    formData.append(item[0], item[1]);
  });
  return formData;
}
