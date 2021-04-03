import React, {PropsWithChildren, PureComponent, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';

import ImagePicker from 'react-native-image-picker';

interface Props extends PropsWithChildren<any> {
  useDefaultCameraBtn?: boolean;
  scanQRCode?: Function | null;
  isScanning?: boolean;
  useAlbum?: boolean;
  setImage?: Function | null;
}
export default function Camera({
  useDefaultCameraBtn = true,
  scanQRCode = null,
  isScanning = false,
  useAlbum = true,
  setImage = null,
}: Props) {
  const navigation = useNavigation();

  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    if (setImage) {
      setImage(data.uri);
    }
    navigation.goBack();
    return true;
  };

  function openAlbum() {
    const options = {
      title: 'Load Photo',
      customButtons: [
        {name: 'button_id_1', title: 'CustomButton 1'},
        {name: 'button_id_2', title: 'CustomButton 2'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // setLoading(false);
      if (response.uri && setImage) {
        setImage(response.uri);
        navigation.goBack();
      }
    });
  }
  return (
    <>
      <View testID="Camera" style={styles.container}>
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
            return (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}>
                  {useAlbum ? (
                    <View
                      style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 60,
                      }}>
                      <TouchableOpacity
                        testID="album"
                        onPress={() => openAlbum()}
                        style={styles.capture}>
                        <Text style={{fontSize: 14}}> ALBUM </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  {useDefaultCameraBtn ? (
                    <View
                      style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        testID="snap"
                        onPress={() =>takePicture(camera)}
                       
                        style={styles.capture}>
                        <Text style={{fontSize: 14}}> SNAP </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </>
            );
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
    borderRadius: 0,
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
