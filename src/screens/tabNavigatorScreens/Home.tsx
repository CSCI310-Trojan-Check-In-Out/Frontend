import React, {useState} from 'react';
import {Button, Modal, Text, View} from 'react-native';
import Camera from '../../components/camera/Camera'
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';

export default function Home({}) {
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);

  return (
    <View style={CommonStyle.outerContainerStyle}>
      {/* <Modal /> */}
      {/*  title */}
      <Text style={CommonStyle.title}>
        {checkedIn ? 'You Are Checked In At' : 'Scan QR Code to Check In'}
      </Text>

      {/* building */}
      <View style={[CommonStyle.locationBoxContainer, {margin: 30}]}>
        <Camera></Camera>
        {/* <Text>Computer Science Building</Text> */}
      </View>

      <View style={{width: '40%', backgroundColor: 'white'}}>
        <Button
          title={checkedIn ? 'check out' : 'Quick Scan'}
          color={Theme.RED_PRIMARY}
          onPress={() => {
            setCheckedIn(!checkedIn);
          }}
        />
      </View>
    </View>
  );
}
