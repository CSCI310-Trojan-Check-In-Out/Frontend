import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
import ConfirmModal from '../../components/ConfirmModal';
import {useNavigation} from '@react-navigation/native';
import CommonStyle from '../../style/common.style';
import {Context as AppContext} from '../../context/AppContext';
import {
  getUserVisitHistory,
  searchVisitHistory,
} from '../../api/backendApiCalls';
import VisitHistoryList from '../../components/visitHistory/VisitHistoryList';

export default function StudentProfile({route}) {
  const {state} = useContext(AppContext);
  const {picture, username, usc_id, major} = route.params.student;
  const {history}=route.params.item; //subject to change (handling request from visitHistory tab)
  const [studentHistory, setStudentHistory] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params.student) {
      searchVisitHistory(
        {studentId: route.params.student.usc_id},
        setStudentHistory,
      );
    } else {
      getUserVisitHistory(setStudentHistory);
    }
  }, []);

  return (
    <>
      <View style={CommonStyle.outerContainerStyle}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.textcontainer}>
              <Text style={styles.name}>Name: {username} </Text>
              <Text style={styles.uscid}>USCID: {usc_id} </Text>
              <Text style={styles.major}>Major: {major} </Text>
            </View>
          </View>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Visit History:</Text>
          </View>
          <View style={styles.historyList}>
            <VisitHistoryList historyList={studentHistory} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  profile: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 20,
    flexDirection: 'row',
  },
  textcontainer: {
    marginLeft: 40,
    marginRight: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  uscid: {
    fontSize: 18,
  },
  major: {
    fontSize: 18,
  },
  subTitleContainer: {
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  historyList: {
    flex: 1,
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
