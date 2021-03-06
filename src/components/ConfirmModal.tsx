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

// Style
import CommonStyle from '../style/common.style';
import Theme from '../style/theme.style';

export default function ConfirmModal({setShowModal, QRCode, acceptQRCode, declineQRCode }) {
  return (
    <>
      <Modal transparent={true}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={[
              CommonStyle.locationBoxContainer,
              {
                // width: '80%',
                alignSelf: 'center',
                height: '20%',
                padding: 20,
                // position: 'relative',
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              },
            ]}>
            <Text>Are you sure you want to check in: </Text>
            <Text>{QRCode}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
              }}>
              <View style={{width: '30%'}}>
                <Button
                  title={'No'}
                  color={Theme.RED_PRIMARY}
                  onPress={() => {
                    declineQRCode();
                  }}
                />
              </View>

              <View style={{width: '30%'}}>
                <Button
                  title={'Yes'}
                  color={Theme.RED_PRIMARY}
                  onPress={() => {
                    acceptQRCode();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
