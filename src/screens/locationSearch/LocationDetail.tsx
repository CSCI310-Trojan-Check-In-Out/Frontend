import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CommonStyle from '../../style/common.style';
import {getQRCodeApi} from '../../api/backendApiCalls';
import {Context as AppContext} from '../../context/AppContext';
import QRCode from 'react-native-qrcode-svg';
import ConfirmModal from '../../components/ConfirmModal';
import {removeBuildingApi} from '../../api/backendApiCalls';
import {
  subscribeBuildingCurrentCapacity,
  subscribeBuildingMaximumCapacity,
  unSubscribeBuildingCurrentCapacity,
  unSubscribeBuildingMaximumCapacity,
} from '../../api/firebaseApi';

export default function LocationDetail({route, navigation}) {
  const {state, pinQRCode} = useContext(AppContext);
  const [building, setBuilding] = useState(route.params.building);
  const [buildingQRCode, setQRCode] = useState<string>('111');
  const [isManager, setIsManager] = useState(true);

  const [purpose, setPurpose] = React.useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState();

  const [maximumCapacity, updateMaximumCapacity] = useState(building.capacity);
  const [currentCapacity, updateCurrentCapacity] = useState(
    building.current_numbers,
  );

  useEffect(() => {
    setQRCode(String(route.params.building.qr_code_token));
    subscribeBuildingMaximumCapacity(building.id, updateMaximumCapacity);
    subscribeBuildingCurrentCapacity(building.id, updateCurrentCapacity);
    return () => {
      // unSubscribeBuildingMaximumCapacity(building.id);
      // unSubscribeBuildingCurrentCapacity(building.id);
    };
  }, [navigation]);

  function decline() {
    setPurpose('');
    setShowModal(false);
  }

  function accept() {
    switch (purpose) {
      case 'removeBuilding': {
        removeBuildingApi(building.id, () => {
          Alert.alert('Building is removed successfully!');
          navigation.navigate('LocationSearch');
        });
      }
      default:
        break;
    }
    setPurpose('');
    setShowModal(false);
  }

  function pinQRCodeSucceed() {
    // getQRCodeApi(route.params.buildingId,pinQRCode);
    const pinnedBuilding = {
      buildingName: building.place_name,
      QRCode: building.qr_code_token,
    };
    pinQRCode(pinnedBuilding);
    Alert.alert('', 'Successfully Pinnned QR Code to Home');
  }

  return (
    <>
      <View testID="locationDetail" style={CommonStyle.outerContainerStyle}>
        {showModal ? (
          <ConfirmModal
            setShowModal={showModal}
            title={modalTitle}
            message={modalMessage}
            decline={() => decline()}
            accept={() => accept()}
          />
        ) : null}
        <View
          style={isManager ? styles.titleContainer1 : styles.titleContainer2}>
          <Text style={styles.title}>{'Search Result'}</Text>
        </View>
        <View style={styles.profile}>
          {buildingQRCode ? (
            <View testID="locationDetailQRCode">
              <QRCode value={buildingQRCode} size={200} quietZone={10} />
            </View>
          ) : null}

          <View style={styles.textcontainer}>
            <Text style={styles.name}>{route.params.building.place_name}</Text>
            {isManager ? (
              <Text style={styles.capacity}>
                Current Capacity: {currentCapacity}/{maximumCapacity}
              </Text>
            ) : null}
          </View>
        </View>

        {isManager ? (
          <>
            <View style={styles.buttonRowContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={pinQRCodeSucceed}
                testID="locationDetailPinQRCode">
                <Text style={styles.textButton}>Pin QR Code</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                testID="locationDetailUpdateCapacity"
                onPress={() =>
                  navigation.navigate('UpdateCapacity', {building: building})
                }>
                <Text style={styles.textButton}>Update Capacity</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRowContainer}>
              <TouchableOpacity
                style={styles.button}
                testID="locationDetailViewStudent"
                onPress={() =>
                  navigation.navigate('StudentListScreen', {building: building})
                }>
                <Text style={styles.textButton}>View Students</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                testID="locationDetailRemoveBuilding"
                onPress={() => {
                  setPurpose('removeBuilding');
                  setModalMessage('Do you want to remove this building?');
                  setShowModal(true);
                }}>
                <Text style={styles.textButton}>Remove Building</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.buttonRowContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Check in</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer1: {
    alignItems: 'center',
    marginTop: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '5%',
    padding: '3%',
  },
  titleContainer2: {
    alignItems: 'center',
    marginTop: '10%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '5%',
    padding: '3%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profile: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 270,
    height: 270,
    flexDirection: 'row',
  },
  textcontainer: {
    alignItems: 'center',
    margin: 20,
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  capacity: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonRowContainer: {
    marginTop: 25,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#9D2235',
    width: 160,
    height: 60,
    marginLeft: 7,
    marginRight: 7,
    padding: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
  },
});
