import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function ScanLoadingSpinner({scanning}) {
  return (
    <>
      {scanning ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <ActivityIndicator size={40} color={'black'} />
        </View>
      ) : null}
    </>
  );
}
