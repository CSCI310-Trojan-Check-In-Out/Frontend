import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CommonStyle from '../../style/common.style';

export default function LocationDetail() {
  const [location, setLocation] = useState<any>();

  return (
    <>
      <View style={CommonStyle.outerContainerStyle}>
          <Text>Location Detail Page</Text>
          <Text>current Capacity</Text>
          <Text>Maximum Capacity</Text>
          <Text>Update Capacity</Text>
      </View>
    </>
  );
}
