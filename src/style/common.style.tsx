import {StyleSheet} from 'react-native';
import Theme from './theme.style';

export default StyleSheet.create({
  inputBoxStyle: {
    borderRadius: 30,
    padding: 20,
    height: 60,
    backgroundColor: 'rgba(220, 220, 220, 1)',
    margin: 10,
  },
  title: {fontWeight: 'bold', fontSize: Theme.FONT_SIZE_LARGE},
  locationBoxContainer: {
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 380,
    width: "80%",
  },
  outerContainerStyle: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
});
