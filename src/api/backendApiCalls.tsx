import axios from 'axios';
import config from './config';
import {Context as AppContext} from '../context/AppContext';

const ACCOUNT_URL = `${config.URL_ENDPOINT}/account`;
const MANAGER_URL = `${config.URL_ENDPOINT}/manager`;
const STUDENT_URL = `${config.URL_ENDPOINT}/student`;

/* -------------------------------------------------------------------------- */
/*                                  All users                                 */
/* -------------------------------------------------------------------------- */

// sign up
export function signupApi(
  image,
  isAdmin,
  fullName,
  uscID,
  email,
  major,
  password,
  successCallback,
  failureCallback = null,
) {
  const form = createFormData([
    ['image', image],
    ['isAdmin', isAdmin],
    ['fullName', fullName],
    ['uscId', uscID],
    ['email', email],
    ['major', major],
    ['password', password],
  ]);

  axios({
    method: 'post',
    url: `${ACCOUNT_URL}/register`, //ACCOUNT_URL + 'login',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.status === 200) {
      const userData = res.data;
      console.log(userData);
      successCallback(userData);
    }
    // else {
    //   failureCallback();
    // }
  });
}

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
  axios({
    method: 'post',
    url: `${ACCOUNT_URL}/logout`,
  }).then((res) => {
    if (res.status === 200) {
      successCallback();
    }
  });
}
// delete account
// TODO: connect to backend
export function deleteAccountApi(
  id: any,
  successCallback: Function,
  failureCallback: Function | null,
) {
  const form = createFormData([['id', id]]);

  axios({
    method: 'post',
    url: `${ACCOUNT_URL}/deleteAccount`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.status === 200) {
      successCallback();
    }
  });
}

// change Password
export function changePasswordApi(
  id: any,
  oldPassword: any,
  newPassword: any,
  successCallback: Function,
  failureCallback: Function,
) {
  const form = createFormData([
    ['userid', id],
    ['oldPassword', oldPassword],
    ['newPassword', newPassword],
  ]);

  axios({
    method: 'post',
    url: `${ACCOUNT_URL}/changePassword`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.status === 200) {
      successCallback();
    } else {
      failureCallback(res.data);
    }
  });
}

/* -------------------------------------------------------------------------- */
/*                                   manager                                  */
/* -------------------------------------------------------------------------- */

// pinQRCode
export function getQRCodeApi(buildingId: any, successCallback: Function) {
  const form = createFormData([['placeId', buildingId]]);

  axios({
    method: 'post',
    url: `${MANAGER_URL}/get-qr-code`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.status === 200) {
      const QRCode = res.data.rows[0].qr_code_token;
      successCallback(QRCode);
    }
  });
}

export function getAllLocationsApi(successCallback: Function) {
  axios({
    method: 'post',
    url: `${MANAGER_URL}/list-all-buildings`,
  }).then((res) => {
    if (res.status === 200) {
      const buildings = res.data.rows;
      successCallback(buildings);
    }
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Student                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   helpers                                  */
/* -------------------------------------------------------------------------- */

function createFormData(data: any[][2]) {
  const formData = new FormData();
  data.forEach((item: any[]) => {
    formData.append(item[0], item[1]);
  });
  return formData;
}
