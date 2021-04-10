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

  function comeFrom() {
    console.log(route.params);
    if (route.params.from === 'studentList') {
      return route.params.student;
    } else {
      return route.params.history;
    }
  }
  const {first_name, last_name, usc_id, major, is_deleted} = comeFrom();

  const [studentHistory, setStudentHistory] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    // manager visiting student profile from locationSearch, and from visitHistory
    if (route.params.student || route.params.item) {
      searchVisitHistory(
        {userId: route.params.student.account_id},
        setStudentHistory,
      );
      // search history route : manager
    } else if (route.params.history) {
      searchVisitHistory(
        {userId: route.params.history.account_id},
        setStudentHistory,
      );
    } else {
      // student visit her own visitHistory
      getUserVisitHistory(setStudentHistory);
    }
  }, []);

  return (
    <>
      <View style={CommonStyle.outerContainerStyle}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.textcontainer}>
              <Text style={styles.name}>
                Name: {first_name} {last_name}{' '}
              </Text>
              {usc_id ? (
                <Text style={styles.uscid}>USCID: {usc_id} </Text>
              ) : null}

              <Text style={styles.major}>Major: {major} </Text>
              {is_deleted === 1 ? (
                <Text style={styles.uscid}>Account has been deleted</Text>
              ) : null}
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
