import {Alert} from 'react-native';
export function emailRegexCheck(email: string) {
  if (email.endsWith('@usc.edu')) {
    return true;
  }
  return false;
}

export function notEmpty(inputs: string[]) {
  if (inputs.length === 0) {
    return false;
  }
  var result = true;
  inputs.forEach((input) => {
    if (!input) {
      result = false;
    }
  });
  return result;
}

export function alertError(message: string) {
  Alert.alert('', message);
}
