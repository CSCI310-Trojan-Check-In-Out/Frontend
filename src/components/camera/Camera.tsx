import React, {PropsWithChildren, PureComponent, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

interface Props extends PropsWithChildren<any> {
  useDefaultCameraBtn: boolean;
  scanQRCode?: Function | null;
  isScanning: boolean;
}

export default function Camera({
  useDefaultCameraBtn,
  scanQRCode,
  isScanning = false,
}: Props) {
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
    return true;
  };

  return (
    <>
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          ratio={'16:9'}
          type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            if (scanQRCode && isScanning) {
              scanQRCode(barcodes);
            }
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            return useDefaultCameraBtn ? (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => test(takePicture, camera)}
                  style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            ) : null;
          }}
        </RNCamera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
