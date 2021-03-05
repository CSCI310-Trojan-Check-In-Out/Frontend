import React, {useState} from 'react';
import {ActivityIndicator, Button, Modal, Text, View} from 'react-native';

// components
import Camera from '../../components/camera/Camera';
import ScanLoadingSpinner from '../../components/home/student/ScanLoadingSpinner';
import HomeButton from '../../components/home/student/HomeButton';

// Style
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';

export default function Home({}) {
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);

  function scanQRCode(QRCode) {
    if (QRCode.length > 0 && QRCode[0].format != 'None') {
      console.log(QRCode[0].data);
      setScanning(false);
    }
  }

  function handleButton() {
    if (checkedIn) {
      setCheckedIn(false);
    } else {
      setScanning(!scanning);
    }
  }
  return (
    <View style={CommonStyle.outerContainerStyle}>
      {/* <Modal /> */}
      {/*  title */}
      <Text style={CommonStyle.title}>
        {checkedIn ? 'You Are Checked In At' : 'Scan QR Code to Check In'}
      </Text>
      {/* building */}
      <View style={[CommonStyle.locationBoxContainer, {margin: 30}]}>
        {!checkedIn ? (
          <Camera
            useDefaultCameraBtn={false}
            scanQRCode={scanQRCode}
            isScanning={scanning}></Camera>
        ) : (
          <Text>Computer Science Building</Text>
        )}
      </View>
      <ScanLoadingSpinner scanning={scanning} />

      <HomeButton
        checkedIn={checkedIn}
        scanning={scanning}
        handleButton={handleButton}
      />
    </View>
  );
}
