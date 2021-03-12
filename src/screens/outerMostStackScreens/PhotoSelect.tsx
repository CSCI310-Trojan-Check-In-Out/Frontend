import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

import Camera from '../../components/camera/Camera';

export default function PhotoSelect() {
  return (
    <>
      <Camera />
    </>
  );
}
