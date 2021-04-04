import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonStyle from '../style/common.style';
import Theme from '../style/theme.style';

export default function DropDownMenu({setValue}) {
    
    
    return (
      <>
        <DropDownPicker
        items={[
        {label: 'Dornsife College of Letters, Arts and Sciences', value: 'Dornsife College of Letters, Arts and Sciences',textStyle:{textAlign:'center'}},
        {label: 'USC School of Architecture', value: 'USC School of Architecture',textStyle:{textAlign:'center'}},
        {label: 'Roski School of Art and Design', value: 'Roski School of Art and Design',textStyle:{textAlign:'center'}},
        {label: 'Iovine and Young Academy for Arts, Technology and the Business of Innovation', value: 'Iovine and Young Academy for Arts, Technology and the Business of Innovation',textStyle:{textAlign:'center'}},
        {label: 'Marshall School of Business', value: 'Marshall School of Business',textStyle:{textAlign:'center'}},
        {label: 'Viterbi School of Engineering', value: 'Viterbi School of Engineering',textStyle:{textAlign:'center'} },
        {label: 'USC School of Cinematic Arts', value:'USC School of Cinematic Arts',textStyle:{textAlign:'center'} },
        {label: 'Annenberg School for Communication and Journalism', value:'Annenberg School for Communication and Journalism',textStyle:{textAlign:'center'} },
        {label: 'Kaufman School of Dance', value:'Kaufman School of Dance',textStyle:{textAlign:'center'} },
        {label: 'USC School of Dramatic Arts', value:'USC School of Dramatic Arts',textStyle:{textAlign:'center'} },
        {label: 'Davis School of Gerontology', value:'Davis School of Gerontology',textStyle:{textAlign:'center'} },
        {label: 'Keck School of Medicine', value:'Keck School of Medicine',textStyle:{textAlign:'center'} },
        {label: 'Thornton School of Music', value:'Thornton School of Music',textStyle:{textAlign:'center'} },
        {label: 'Chan Division of Occupational Science and Occupational Therapy', value:'Chan Division of Occupational Science and Occupational Therapy' ,textStyle:{textAlign:'center'}},
        {label: 'Price School of Public Policy', value:'Price School of Public Policy',textStyle:{textAlign:'center'}},
        {label: 'Pre-professional Emphases', value:'Pre-professional Emphases',textStyle:{textAlign:'center'} },
        ]}
        placeholder="Please select a school"
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
  