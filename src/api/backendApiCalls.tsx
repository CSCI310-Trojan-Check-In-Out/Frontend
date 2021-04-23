import axios from 'axios';
import config from './config';
import {Alert} from 'react-native';
import {Context as AppContext} from '../context/AppContext';
import md5 from 'md5';
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
  firstName,
  lastName,
  uscID,
  email,
  major,
  password,
  successCallback,
  failureCallback = null,
) {
  const form = createFormData([
    ['image', image],
    ['isAdmin', isAdmin ? 1 : 0],
    ['firstName', firstName],
    ['lastName', lastName],
    ['uscId', uscID],
    ['email', email],
    ['major', major],
    ['password', md5(password)],
  ]);

  if (uscID.length != 10) {
    showErrorString('Error', 'Your USC ID must be 10 digits.');
    console.log(uscID.length);
    return;
  }

  if (password.length < 4) {
    showErrorString(
      'Error',
      'You password must contain at least four digits or characters.',
    );
    return;
  }

  if (firstName.length + lastName.length < 4) {
    showErrorString(
      'Error',
      'Your full name must contain at least four characters',
    );
    return;
  }

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
    ['password', md5(password)],
  ]);

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
      console.log(error);
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
    ['oldPassword', md5(oldPassword)],
    ['newPassword', md5(newPassword)],
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

export function getAllLocationsApi(from: String, successCallback: Function) {
  axios({
    method: 'post',
    url: `${MANAGER_URL}/list-all-buildings`,
  })
    .then((res) => {
      if (res.status === 200) {
        const buildings = res.data;
        if (from === 'visitHistory') {
          const buildingModified = [];
          buildingModified.push({
            label: 'Please Select a Building',
            value: '',
            textStyle: {textAlign: 'center'},
          });
          buildings.map((building) => {
            buildingModified.push({
              label: building.place_name,
              value: building.place_name,
              textStyle: {textAlign: 'center'},
            });
          });
          successCallback(buildingModified);
        } else {
          successCallback(buildings);
        }
      }
    })
    .catch((error) => {
      showError(error);
    });
}

export function addBuildingApi(
  buildingName: string,
  abbreviation: string,
  maximumCapacity: number,
  address: string,
  startTime: string,
  endTime: string,
  successCallback: Function,
  failureCallback: Function,
) {
  const form = createFormData([
    ['place_name', buildingName],
    ['abbreviation', abbreviation],
    ['capacity', maximumCapacity],
    ['place_address', address],
    ['open_time', startTime],
    ['close_time', endTime],
  ]);
  // console.log(buildingName);
  // console.log(abbreviation);
  // console.log(maximumCapacity);
  // console.log(address);
  // console.log(startTime);
  // console.log(endTime);
  axios({
    method: 'post',
    data: form,
    url: `${MANAGER_URL}/add-place`,
  })
    .then((res) => {
      if (res.status === 200) {
        const building = res.data;
        console.log(building);
        successCallback(building);
      }
    })
    .catch((error) => {
      failureCallback();
      showError(error);
    });
}

export function removeBuildingApi(id: any, successCallback: Function) {
  const form = createFormData([['placeId', id]]);

  axios({
    method: 'post',
    data: form,
    url: `${MANAGER_URL}/remove-building`,
  })
    .then((res) => {
      if (res.status === 200) {
        const building = res.data;
        successCallback(building);
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

export function updateCapacityByCSV(CSVUri: string, successCallback: Function) {
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
        successCallback();
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
    userId = undefined,
  },
  successCallback: Function,
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
    formData.push(['username', studentName]);
  }
  if (userId) {
    formData.push(['userId', userId]);
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
      showError(error);
    });
}

export function kickStudentApi(
  id: string,
  successCallback: Function,
  failureCallback: Function,
) {
  const form = createFormData([['id', id]]);

  axios({
    method: 'post',
    url: `${MANAGER_URL}/kickout-student`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        showMessage('Successfully kick student!');
        successCallback();
      }
    })
    .catch((error) => {
      showError(error);
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

export function getUserUnfinishedHistory(successCallback: Function) {
  axios({
    method: 'get',
    url: `${STUDENT_URL}/unfinishedHistory`,
  })
    .then((res) => {
      if (res.status === 200) {
        const historyList = res.data;
        if (historyList.length !== 0) {
          successCallback(historyList[0]);
        }
      }
    })
    .catch((error) => {
      const message = error.response.data;
      console.log(message);
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

function showErrorString(title, message) {
  Alert.alert(title, message);
}

function showError(error) {
  Alert.alert('', error?.response?.data);
}

function showMessage(message: string) {
  Alert.alert('', message);
}
