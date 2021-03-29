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
import {checkinApi, checkoutApi} from '../../../api/backendApiCalls';
import {alertError} from '../../../helpers/inputHelpers';

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
    if (state.checkedInBuilding) {
      if (state.checkedInBuilding.qr_code_token !== currentQRCode) {
        alertError('Wrong Building Qr Code');
      } else {
        checkoutApi(state.checkedInBuilding.qr_code_token, checkout, null);
        setCurrentQRCode('');
        setShowConfirmPopup(false);
      }
    } else {
      checkinApi(currentQRCode, checkinSuccessCallBack, checkinFailureCallBack);
    }
  }

  function checkinSuccessCallBack(building) {
    checkin(building);
    setShowConfirmPopup(false);
    setCurrentQRCode('');
  }

  function checkinFailureCallBack(message) {
    Alert.alert('', message);
  }

  function declineQRCode() {
    setShowConfirmPopup(false);
    setCurrentQRCode('');
  }
  // logics for home button
  function handleButton(isScan = false) {
    if (state.checkedInBuilding && !isScan) {
      // setCheckedIn(false);
      checkoutApi(state.checkedInBuilding.qr_code_token, checkout, null);
    } else if (state.checkedInBuilding && isScan) {
      setScanning(!scanning);
    } else {
      setScanning(!scanning);
    }
  }
  return (
    <View testID="studentHome" style={CommonStyle.outerContainerStyle}>
      {/* <Modal /> */}
      {/*  title */}
      <Text style={CommonStyle.title}>
        {state.checkedInBuilding
          ? 'You Are Checked In At'
          : 'Scan QR Code to Check In'}
      </Text>

      <View style={[CommonStyle.locationBoxContainer, {margin: 30}]}>
        {scanning ? (
          <Camera
            useDefaultCameraBtn={false}
            scanQRCode={scanQRCode}
            useAlbum={false}
            isScanning={scanning}></Camera>
        ) : state.checkedInBuilding ? (
          <>
            <Text>
              Location: {state.checkedInBuilding.place_name}(
              {state.checkedInBuilding.abbreviation})
            </Text>
            <Text> Open Time: {state.checkedInBuilding.open_time}</Text>
            <Text> Close Time: {state.checkedInBuilding.close_time}</Text>
            <Text> Address: {state.checkedInBuilding.place_address}</Text>
          </>
        ) : (
          <Text>QR Code Scan Area</Text>
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
          title={state.checkedInBuilding ? 'Check out?' : 'Check In?'}
          message={currentQRCode}
          accept={acceptQRCode}
          decline={declineQRCode}
        />
      ) : null}
    </View>
  );
}
