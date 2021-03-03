import {useState} from 'react';

export function useSignUp() {
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [uscID, setUscID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [major, setMajor] = useState<string>('');

  return [
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
