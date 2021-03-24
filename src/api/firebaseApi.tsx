import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';

const PROFILE_PIC_REF = 'profilePic';
const BUILDING_REF = 'buildings';

/* -------------------------------------------------------------------------- */
/*                                cloud storage                               */
/* -------------------------------------------------------------------------- */

// TODO: either move this to backend or generate uid or check if already exists
export function uploadProfilePic(uri: any, email: string) {
  const reference = storage().ref(`${PROFILE_PIC_REF}/${String(email)}`);
  return reference.putFile(uri).then(async (snapshot) => {
    console.log(`image has been successfully uploaded.`);
    return reference.getDownloadURL();
  });
}

/* -------------------------------------------------------------------------- */
/*                              realtime database                             */
/* -------------------------------------------------------------------------- */

export function subscribeBuildingMaximumCapacity(
  buildingId: string,
  onChangeCallback: Function,
) {
  const ref = getBuildingCapacityRef(buildingId);
  ref.on('value', (snapshot) => {
    onChangeCallback(snapshot.val());
  });
}

export function unSubscribeBuildingMaximumCapacity(buildingId: string) {
  const ref = getBuildingCapacityRef(buildingId);
  ref.off();
}

export function subscribeBuildingCurrentCapacity(
  buildingId: string,
  onChangeCallback: Function,
) {
  const ref = getBuildingCheckinRef(buildingId);
  ref.on('value', (snapshot) => {
    onChangeCallback(snapshot.numChildren());
  });
}

export function unSubscribeBuildingCurrentCapacity(buildingId: string) {
  const ref = getBuildingCheckinRef(buildingId);
  ref.off();
}

/* -------------------------------------------------------------------------- */
/*                       firebase endpoints route getter                      */
/* -------------------------------------------------------------------------- */

function getBuildingCapacityRef(buildingId: string) {
  return database().ref(`${BUILDING_REF}/${buildingId}/capacity`);
}

function getBuildingCheckinRef(buildingId: string) {
  return database().ref(`${BUILDING_REF}/${buildingId}/checkin`);
}

