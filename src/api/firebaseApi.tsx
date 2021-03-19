import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

// TODO: either move this to backend or generate uid or check if already exists
export function uploadProfilePic(uri: any, email: string) {
  const reference = storage().ref(`profilePic/${String(email)}`);
  return reference.putFile(uri).then(async (snapshot) => {
    console.log(`image has been successfully uploaded.`);
    return reference.getDownloadURL();
  });
}
