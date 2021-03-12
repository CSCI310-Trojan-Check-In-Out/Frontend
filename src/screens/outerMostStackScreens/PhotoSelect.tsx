import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

import Camera from '../../components/camera/Camera';

export default function PhotoSelect({route, navigation}) {
  const {setImage} = route.params;

  return (
    <>
      <Camera setImage={setImage} />
    </>
  );
}
