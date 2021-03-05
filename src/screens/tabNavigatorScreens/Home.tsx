import React, {useState} from 'react';
import {ActivityIndicator, Button, Modal, Text, View} from 'react-native';
import Camera from '../../components/camera/Camera';
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';

export default function Home({}) {
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);

  function scanQRCode(QRCode) {
    console.log(QRCode);
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
      {scanning ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <ActivityIndicator size={40} color={'black'} />
        </View>
      ) : null}

      <View style={{width: '40%', backgroundColor: 'white'}}>
        <Button
          title={
            checkedIn ? 'check out' : scanning ? 'Scanning...' : 'Quick Scan'
          }
          color={Theme.RED_PRIMARY}
          onPress={handleButton}
        />
      </View>
    </View>
  );
}
