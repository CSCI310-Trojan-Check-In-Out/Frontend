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

export function subscribeBuildingCurrentStudent(
  buildingId: string,
  onChangeCallback: Function,
) {
  const ref = getBuildingCheckinRef(buildingId);
  ref.on('value', (snapshot) => {
    // onChangeCallback(snapshot.val());
    onChangeCallback();
  });
}

// TODO: can be optimized in the first render
// for now, it will fetch N times for the first load
export function subscribeBuildingChanges(onChangeCallback: Function) {
  const ref = getBuildingRootRef();
  ref.on('child_added', (snapshot) => {
    console.log('added');
    console.log(snapshot.val());
    if (snapshot.val().capacity) {
      console.log('called fetch building');
      onChangeCallback();
    }
  });

  ref.on('child_removed', (snapshot) => {
    console.log('removed');
    console.log(snapshot.val());
    if (snapshot.val().capacity) {
      console.log('called fetch building');
      onChangeCallback();
    }
  });
}

export function unSubscribBuildingChanges() {
  const ref = getBuildingRootRef();
  ref.off();
}

export function subscribeUserCheckin(
  userId: string,
  buildingId: string,
  onChangeCallback: Function,
) {
  const ref = getBuildingCheckinRef(buildingId);
  ref.on('child_removed', (snapshot) => {
    console.log('removed');
    console.log(snapshot.val());
    const child = snapshot.val();
    if (child.id && child.id == userId) {
      console.log('kicked');
      onChangeCallback();
    }
  });
}

export function unSubscribeUserCheckin(buildingId: string) {
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

function getBuildingRootRef() {
  return database().ref(`${BUILDING_REF}`);
}
