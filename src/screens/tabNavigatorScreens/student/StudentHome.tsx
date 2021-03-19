import React, {useContext, useEffect, useRef, useState} from 'react';
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
import Camera from '../../../components/camera/Camera';
import ScanLoadingSpinner from '../../../components/home/student/ScanLoadingSpinner';
import HomeButton from '../../../components/home/student/HomeButton';
import ConfirmModal from '../../../components/ConfirmModal';
// Style
import CommonStyle from '../../../style/common.style';
import Theme from '../../../style/theme.style';
import QRCode from 'react-native-qrcode-svg';
import {Context as AppContext} from '../../../context/AppContext';

export default function StudentHome({navigation}) {
  const {state, checkin, checkout} = useContext(AppContext);

  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [currentQRCode, setCurrentQRCode] = useState<string>('');
  // turn off camera when navigate away
  var updating = false;

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setScanning(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (currentQRCode) {
      setShowConfirmPopup(true);
    }
  }, [currentQRCode]);
  // do something for QR code
  function scanQRCode(QRCode: string | any[]) {
    if (QRCode.length > 0 && QRCode[0].format !== 'None' && !updating) {
      updating = true;
      setScanning(false);
      setCurrentQRCode(QRCode[0].data);
    }
  }

  function acceptQRCode() {
    // TODO: dispatch
    const payload = {
      building: {
        id: 1,
        name: 'building',
      },
      QRCode: currentQRCode,
    };
    checkin(payload);
    setShowConfirmPopup(false);
    setCurrentQRCode('');
  }

  function declineQRCode() {
    setShowConfirmPopup(false);
    setCurrentQRCode('');
  }
  // logics for home button
  function handleButton() {
    if (state.checkedInBuilding) {
      // setCheckedIn(false);
      checkout();
    } else {
      setScanning(!scanning);
    }
  }
  return (
    <View style={CommonStyle.outerContainerStyle}>
      {/* <Modal /> */}
      {/*  title */}
      <Text style={CommonStyle.title}>
        {state.checkedInBuilding
          ? 'You Are Checked In At'
          : 'Scan QR Code to Check In'}
      </Text>

      <View style={[CommonStyle.locationBoxContainer, {margin: 30}]}>
        {!state.checkedInBuilding && scanning ? (
          <Camera
            useDefaultCameraBtn={false}
            scanQRCode={scanQRCode}
            useAlbum={false}
            isScanning={scanning}></Camera>
        ) : (
          <Text>Computer Science Building</Text>
        )}
      </View>
      <ScanLoadingSpinner scanning={scanning} />

      <HomeButton
        checkedIn={state.checkedInBuilding}
        scanning={scanning}
        handleButton={handleButton}
      />

      {/* confirm modal */}
      {showConfirmPopup ? (
        <ConfirmModal
          setShowModal={setShowConfirmPopup}
          title={'Check In?'}
          message={currentQRCode}
          accept={acceptQRCode}
          decline={declineQRCode}
        />
      ) : null}
    </View>
  );
}
