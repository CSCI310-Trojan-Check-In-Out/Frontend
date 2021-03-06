import React from 'react';
import {StyleSheet,View, Text, TextInput,TouchableOpacity, 
KeyboardAvoidingView, Platform} from 'react-native';

export default function UpdateCapacity({buildingId,buildingName}) {
const [currentCapacity, onChangeCapacity] = React.useState(0);

  return (
  <>
  <KeyboardAvoidingView 
  style={styles.container}
  behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.titleContainer}>
        <Text style={styles.title}>{buildingName}</Text>
    </View>
    <Text style={styles.capacity}>Capacity:</Text>
    <View style={styles.textContainer}>
        <TextInput 
        style={styles.textInput}
        keyboardType = 'numeric'
        onChangeText={(number) => onChangeCapacity(number)}
        value={currentCapacity}/>
    </View>
    <View style={styles.notificationContainer}>
      <Text style={styles.notification}>Feedback from Backend regarding the number/CSV file</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text  style={styles.textButton}>Upload CSV File</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Update</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  titleContainer:{
    alignItems:'center',
    marginTop:'20%',
    marginBottom:'20%',
    paddingLeft:'10%',
    paddingRight:'10%'
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
  },
  capacity:{
    marginLeft:'10%',
    fontSize:20,
    fontWeight:'bold',
  },
  textContainer:{
    alignItems:'center',
    backgroundColor:'#fff',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'5%',
    marginBottom:'10%',
    borderRadius:20,
  },
  textInput:{
      fontSize:15
  },
  notificationContainer:{
    alignItems:'center',
    paddingLeft:"10%",
    paddingRight:'10%',
    marginBottom:'5%'
  },
  notification:{
    color:'red'
  },
  buttonContainer:{
    alignItems:'center',
    height: '30%',
    justifyContent: 'space-evenly',
  },
  button:{
    backgroundColor:'#9D2235',
    width:'60%',
    height:'30%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
  },
  textButton:{
      color:"#fff",
      fontSize:20
  }
});
