import {useState} from 'react';
import {emailRegexCheck, notEmpty, alertError} from './../helpers/inputHelpers';

export function useSignUp() {
  const [image, setImage] = useState<string>('');
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [uscID, setUscID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [major, setMajor] = useState<string>('');

  function onSubmit(successCallback: Function) {
    // if (!notEmpty([image, fullName, uscID, email, major])) {
    //   alertError('field(s) cannot be empty');
    //   return;
    // }
    // if (!emailRegexCheck(email)) {
    //   alertError('must be usc email');
    //   return;
    // }
    successCallback(image, isStudent, fullName, uscID, email, major);
  }
  return [
    image,
    setImage,
    password,
    setPassword,
    isStudent,
    setIsStudent,
    fullName,
    setFullName,
    uscID,
    setUscID,
    email,
    setEmail,
    major,
    setMajor,
    onSubmit,
  ];
}
