import React from 'react';
import {Text} from 'react-native';
import ManagerHome from './manager/ManagerHome';


export default function VisitHistory() {
  return (
  <>
  <Text>VisitHistory</Text>
  <ManagerHome withQRCode={true}/>
  </>
  );
}
