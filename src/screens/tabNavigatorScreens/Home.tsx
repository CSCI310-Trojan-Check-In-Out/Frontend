import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// components
import Camera from '../../components/camera/Camera';
import ScanLoadingSpinner from '../../components/home/student/ScanLoadingSpinner';
import HomeButton from '../../components/home/student/HomeButton';
import ConfirmModal from '../../components/ConfirmModal';
// Style
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';
import QRCode from 'react-native-qrcode-svg';

import StudentHome from './student/StudentHome';
import ManagerHome from './manager/ManagerHome';
export default function Home({navigation}) {
  return (
    <>
      <StudentHome navigation={navigation}></StudentHome>
      {/* <ManagerHome withQRCode={true}></ManagerHome> */}
    </>
  );
}
