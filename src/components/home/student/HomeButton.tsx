import React from 'react';
import {View, Button} from 'react-native';

// Style
import CommonStyle from '../../../style/common.style';
import Theme from '../../../style/theme.style';

export default function HomeButton({checkedIn, scanning, handleButton}) {
  return (
    <>
      <View style={{width: '40%', backgroundColor: 'white'}}>
        <Button
          title={
            checkedIn ? 'check out' : scanning ? 'Scanning...' : 'Quick Scan'
          }
          color={Theme.RED_PRIMARY}
          onPress={handleButton}
        />
      </View>
    </>
  );
}
