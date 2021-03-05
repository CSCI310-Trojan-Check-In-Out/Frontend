import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
export default function Profile() {
  return (
    <>
      <View>
        <Text>Profile</Text>
        
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.profilePicture}
              source={{uri: ''}}
            />
            <Text style={styles.name}></Text>
            <Text style={styles.uscid}></Text>
            <Text style={styles.major}></Text>
          </View>
          <View style={styles.row}>
            <IconButton iconName={'camera-outline'} text={'Update Photo'} />
            <IconButton iconName={'log-out-outline'} text={'Log out'} />
          </View>
          <View style={styles.row}>
            <IconButton iconName={'close-outline'} text={'Delete Account'} />
            <IconButton iconName={'key-outline'} text={'Change Password'} />
          </View>
        </View>



        

      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container:{

  },
  profile:{

  },
  profilePicture:{

  },
  name:{

  },
  uscid:{

  },
  major:{

  },
  row:{
    marginTop:10,
    marginBottom:10,
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection:'row',

  },
});

