import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonStyle from '../style/common.style';
import Theme from '../style/theme.style';

export default function DropDownMenu({items, placeholder, setValue}) {
    
    
    return (
      <>
        <DropDownPicker
        items={items}
        placeholder={placeholder}
        containerStyle={{width:'100%',height:70,alignItems:'center',}}
        style={CommonStyle.inputBoxStyle}
        itemStyle={{alignItems: 'center'}}
        dropDownStyle={styles.dropDown}
        onChangeItem={item => setValue(item.value)}
        />
            
        </>
        );
    }

  const styles = StyleSheet.create({
    dropDown:{
      backgroundColor: '#fafafa',
      width:'95%',
    }
  });
  