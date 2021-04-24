import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import IconButton from '../../components/IconButton';
import ConfirmModal from '../../components/ConfirmModal';
import {useNavigation} from '@react-navigation/native';
import CommonStyle from '../../style/common.style';
import {Context as AppContext} from '../../context/AppContext';
import {
  getUserVisitHistory,
  searchVisitHistory,
  kickStudentApi,
} from '../../api/backendApiCalls';
import VisitHistoryList from '../../components/visitHistory/VisitHistoryList';

export default function StudentProfile({route}) {
  const {state} = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState();
  const [userId, setUserId] = useState<any>('');
  function comeFrom() {
    console.log(route.params);
    if (route.params.from === 'studentList') {
      return route.params.student;
    } else {
      return route.params.history;
    }
  }
  const {
    first_name,
    last_name,
    usc_id,
    major,
    is_deleted,
    account_picture,
  } = comeFrom();

  const [studentHistory, setStudentHistory] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    console.log(comeFrom());
    // manager visiting student profile from locationSearch, and from visitHistory
    if (route.params.student || route.params.item) {
      setUserId(route.params.student.account_id);
      searchVisitHistory(
        {userId: route.params.student.account_id},
        setStudentHistory,
      );
      // search history route : manager
    } else if (route.params.history) {
      setUserId(route.params.history.account_id);
      searchVisitHistory(
        {userId: route.params.history.account_id},
        setStudentHistory,
      );
    } else {
      setUserId(state.user.id);
      // student visit her own visitHistory
      getUserVisitHistory(setStudentHistory);
    }
  }, []);

  function kickStudent() {
    setModalMessage('Do you want to kick out the student?');
    setShowModal(true);
  }

  function decline() {
    setShowModal(false);
  }

  function accept() {
    setShowModal(false);
    kickStudentApi(
      userId,
      () => {
        searchVisitHistory({userId}, setStudentHistory);
      },
      () => {},
    );
  }

  return (
    <>
      <View style={CommonStyle.outerContainerStyle}>
        {showModal ? (
          <ConfirmModal
            setShowModal={showModal}
            title={modalTitle}
            message={modalMessage}
            decline={() => decline()}
            accept={() => accept()}
          />
        ) : null}

        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.pictureButton}>
              <Image
                style={styles.profilePicture}
                source={{uri: account_picture ?? ''}}
              />
              {is_deleted === 0 ? (
                <View style={styles.button}>
                  <Button
                    color={'#9D2235'}
                    onPress={() => kickStudent()}
                    title="Kick"
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.textcontainer}>
              <Text style={styles.name}>
                Name: {first_name} {last_name}{' '}
              </Text>
              {usc_id ? (
                <Text style={styles.uscid}>USCID: {usc_id} </Text>
              ) : null}

              <Text style={styles.major}>Major: {major} </Text>
              {/* <Text style={styles.checkedin}>Currently Checking in:{''}</Text> */}
              {is_deleted === 1 ? (
                <Text style={styles.deleted}>(Account Deleted)</Text>
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
    width: '80%',
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pictureButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    marginTop: '10%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
    width: 70,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 20,
    flexDirection: 'row',
  },
  textcontainer: {
    width: '60%',
    marginLeft: 40,
    marginRight: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
  },
  uscid: {
    fontSize: 18,
  },
  major: {
    fontSize: 18,
  },
  checkedin: {
    fontSize: 18,
  },
  deleted: {
    marginTop: '5%',
    fontSize: 18,
  },
  subTitleContainer: {
    marginTop: 20,
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
