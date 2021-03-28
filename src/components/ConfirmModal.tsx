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

export default function ConfirmModal({setShowModal, title,  message, accept, decline }) {
  return (
    <>
    <View testID={message} >
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
            <Text>{title}</Text>
            <Text>{message}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
              }}>
              <View style={{width: '30%'}}>
                <Button
                  testID='No'
                  title={'No'}
                  color={Theme.RED_PRIMARY}
                  onPress={() => {
                    decline();
                  }}
                />
              </View>

              <View style={{width: '30%'}}>
                <Button
                  testID='Yes'
                  title={'Yes'}
                  color={Theme.RED_PRIMARY}
                  onPress={() => {
                    accept();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
}
