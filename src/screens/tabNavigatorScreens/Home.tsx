import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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

// Style
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';

export default function Home({navigation}) {
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setScanning(false);
    });
    return unsubscribe;
  }, [navigation]);

  function scanQRCode(QRCode: string | any[]) {
    if (QRCode.length > 0 && QRCode[0].format !== 'None') {
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
        {!checkedIn && scanning ? (
          // <Modal transparent={true}>
          //   <TouchableWithoutFeedback onPress={() => setScanning(false)}>
          //     <View
          //       style={{
          //         width: '100%',
          //         height: '100%',
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
          //       }}>
          //       <View
          //         style={[
          //           CommonStyle.locationBoxContainer,
          //           {
          //             // width: '80%',
          //             alignSelf: 'center',
          //             // height: '50%',
          //             // position: 'relative',
          //             // display: 'flex',
          //             alignItems: 'center',
          //             justifyContent: 'center',
          //           },
          //         ]}>
          <Camera
            useDefaultCameraBtn={false}
            scanQRCode={scanQRCode}
            isScanning={scanning}></Camera>
        ) : (
          //       </View>
          //     </View>
          //   </TouchableWithoutFeedback>
          // </Modal>
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
