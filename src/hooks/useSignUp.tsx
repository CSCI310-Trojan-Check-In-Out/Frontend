import {useState} from 'react';
import {emailRegexCheck, notEmpty, alertError} from './../helpers/inputHelpers';

export function useSignUp() {
  const [image, setImage] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [uscID, setUscID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [major, setMajor] = useState<string>('');

  function submitForm(successCallback: Function) {
    if (signUpCheck()) {
      successCallback(image, isAdmin, fullName, uscID, email, major, password);
    }
  }
  function signUpCheck() {
    if (isAdmin) {
      if (!notEmpty([email, password, fullName])) {
        alertError('manager must enter email, password, and full name');
        return false;
      }
    } else {
      if (!notEmpty([email, password, fullName, major, uscID])) {
        alertError(
          'student must enter email, password, full name, major, and uscId',
        );
        return false;
      }
    }
    if (!emailRegexCheck(email)) {
      alertError('must be usc email');
      return false;
    }
    return true;
  }

  return [
    image,
    setImage,
    password,
    setPassword,
    isAdmin,
    setIsAdmin,
    fullName,
    setFullName,
    uscID,
    setUscID,
    email,
    setEmail,
    major,
    setMajor,
    submitForm,
  ];
}
