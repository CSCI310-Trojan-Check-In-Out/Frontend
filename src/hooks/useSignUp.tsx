import {useState} from 'react';
import {emailRegexCheck, notEmpty, alertError} from './../helpers/inputHelpers';

export function useSignUp() {
  const [image, setImage] = useState<string>('');
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [uscID, setUscID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [major, setMajor] = useState<string>('');

  function onSubmit() {
    
  }
  return [
    image,
    setImage,
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
  ];
}
