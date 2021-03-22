import axios from 'axios';
import config from './config';
import {Alert} from 'react-native';
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
  console.log(image);

  const form = createFormData([
    ['image', image],
    ['isAdmin', isAdmin ? 1 : 0],
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
  })
    .then((res) => {
      if (res.status === 200) {
        const userData = res.data;
        console.log(userData);
        successCallback(userData);
      }
    })
    .catch((error) => {
      showError(error);
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
  })
    .then((res) => {
      if (res.status === 200) {
        const userData = res.data;
        successCallback(userData);
      }
    })
    .catch((error) => {
      failureCallback();
      showError(error);
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
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback();
      }
    })
    .catch((error) => {
      showError(error);
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
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback();
      }
    })
    .catch((error) => {
      showError(error);
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
    ['userId', id],
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
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback();
      }
    })
    .catch((error) => {
      showError(error);
    });
}

// change Password
export function changeProfileImageApi(
  image: string,
  successCallback: Function,
) {
  const form = createFormData([['profilePicLink', image]]);

  axios({
    method: 'post',
    url: `${ACCOUNT_URL}/updateProfilePicture`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback(image);
      }
    })
    .catch((error) => {
      showError(error);
    });
}

// StudentVisitHistory
// (1) Manager Account: Manager clicks into a student and can see the profile (with visit history)
// (2) Student Account: Student clicks into visitHistory Tab and can see her own visit history

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
  })
    .then((res) => {
      if (res.status === 200) {
        const QRCode = res.data.rows[0].qr_code_token;
        successCallback(QRCode);
      }
    })
    .catch((error) => {
      showError(error);
    });
}

export function getAllLocationsApi(successCallback: Function) {
  axios({
    method: 'post',
    url: `${MANAGER_URL}/list-all-buildings`,
  })
    .then((res) => {
      if (res.status === 200) {
        const buildings = res.data;
        successCallback(buildings);
      }
    })
    .catch((error) => {
      showError(error);
    });
}

export function getAllStudentsApi(id: any, successCallback: Function) {
  const form = createFormData([['placeId', id]]);
  axios({
    method: 'post',
    data: form,
    url: `${MANAGER_URL}/list-current-students`,
  })
    .then((res) => {
      if (res.status === 200) {
        const students = res.data;
        console.log(students);
        successCallback(students);
      }
    })
    .catch((error) => {
      showError(error);
    });
}

export function updateCapacityApi(
  id: any,
  currentCapacity: any,
  successCallback: Function,
  failureCallback: Function,
) {
  const form = createFormData([
    ['placeId', id],
    ['capacity', currentCapacity],
  ]);

  axios({
    method: 'post',
    url: `${MANAGER_URL}/update-capacity`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback();
      }
    })
    .catch((error) => {
      failureCallback();
      showError(error);
    });
}

export function updateCapacityByCSV(CSVUri: string) {
  var csv = {
    uri: CSVUri,
    type: 'text/csv',
    name: 'capacity.csv',
  };

  const form = new FormData();
  form.append('place-csv', csv);

  axios({
    method: 'post',
    url: `${MANAGER_URL}/process-csv`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        showMessage('Successfully updated capacity');
      }
    })
    .catch((error) => {
      showError(error);
    });
}

export function searchVisitHistory(
  {
    studentName = undefined,
    buildingName = undefined,
    studentId = undefined,
    major = undefined,
    startTime = undefined,
    endTime = undefined,
  },
  successCallback = Function,
) {
  var formData = [];
  if (buildingName) {
    formData.push(['buildingName', buildingName]);
  }
  if (studentId) {
    formData.push(['studentId', studentId]);
  }
  if (major) {
    formData.push(['major', major]);
  }
  if (startTime) {
    formData.push(['enter_time', startTime]);
  }
  if (endTime) {
    formData.push(['leave_time', endTime]);
  }
  if (studentName) {
    formData.push(['studentName', studentName]);
  }

  const form = createFormData(formData);
  axios({
    method: 'post',
    url: `${MANAGER_URL}/search-visit-history`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback(res.data);
      }
    })
    .catch((error) => {
      // failureCallback();
      // showError(error);
    });
}

/* -------------------------------------------------------------------------- */
/*                                   Student                                  */
/* -------------------------------------------------------------------------- */

export function checkinApi(
  QRCode: string,
  successCallback: Function,
  failureCallback: Function,
) {
  const form = createFormData([['qrCodeToken', QRCode]]);
  console.log(QRCode);
  axios({
    method: 'post',
    url: `${STUDENT_URL}/checkin`, //ACCOUNT_URL + 'login',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        const building = res.data;
        successCallback(building);
      } else {
        // failureCallback();
        const message = res.data;
        failureCallback(message);
      }
    })
    .catch((error) => {
      const message = error.response.data;
      failureCallback(message);
    });
}

export function checkoutApi(
  QRCode: string,
  successCallback: Function,
  failureCallback: Function | null,
) {
  const form = createFormData([['qrCodeToken', QRCode]]);
  axios({
    method: 'post',
    url: `${STUDENT_URL}/checkout`, //ACCOUNT_URL + 'login',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        successCallback();
      }
    })
    .catch((error) => {
      showError(error);
    });
}

export function getUserVisitHistory(successCallback: Function) {
  axios({
    method: 'post',
    url: `${STUDENT_URL}/pastHistory`,
  })
    .then((res) => {
      if (res.status === 200) {
        const historyList = res.data;
        console.log(res.data);
        successCallback(historyList);
      }
    })
    .catch((error) => {
      const message = error.response.data;
      console.log(message);
    });
}

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

function showError(error) {
  Alert.alert('', error?.response?.data);
}

function showMessage(message: string) {
  Alert.alert('', message);
}
