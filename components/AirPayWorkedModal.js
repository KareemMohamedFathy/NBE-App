import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Button from './ui/Button';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {useDispatch, useSelector} from 'react-redux';
import strings from './Language/AuthNames';
function AirPayWorkedModal(props) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  const a = props.modalon;
  const styles = useGlobalStyles();
  const localThemes = useTheme();

  return (
    <Modal
      transparent={true}
      visible={props.modalon}
      statusBarTranslucent={true}
      onBackdropPress={props.onPress}
      style={{margin: 0}}>
      <View style={{flex: 10}}>
        <View
          style={{
            backgroundColor: 'rgba(28, 36, 55, 0.77)',
            flex: 1,
          }}>
          <View style={styles.container}>
            <Image
              source={require('../assets/cards.png')}
              style={styles.fingerprint}></Image>

            <Text style={styles.header}>{strings.missioncomplete}</Text>
            <Text style={styles.subheader}>{strings.paymentsuccesfull}</Text>
            <Text style={styles.amount}>$5,542.00</Text>

            <Button onPress={props.onPress}>{strings.done}</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
function useGlobalStyles() {
  const {dark} = useTheme();
  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  // We only want to recompute the stylesheet on changes in color.
  const styles1 = useMemo(() => styles({colors}), [colors]);

  return styles1;
}
const styles = props =>
  StyleSheet.create({
    header: {
      marginTop: 10,
      color: 'black',
      fontWeight: '700',
      fontSize: 22,
      marginStart: 16,
      textAlign: 'center',
    },

    subheader: {
      marginTop: 5,
      color: '#B7B7B7',
      textAlign: 'center',
      marginStart: 16,

      fontWeight: '400',
      fontSize: 16,
    },
    fingerprint: {
      marginEnd: 'auto',
      marginStart: 16,
      marginTop: 10,
    },

    amount: {
      fontSize: 40,
      color: 'black',
      textAlign: 'center',
      fontWeight: '700',
      marginStart: 16,
    },
    container: {
      backgroundColor: 'white',
      maxHeight: '55%',
      flex: 10,
      paddingHorizontal: 18,
      marginHorizontal: 25,
      borderRadius: 18,
      marginTop: 'auto',
      marginBottom: 'auto',
      justifyContent: 'center',
    },
  });
export default AirPayWorkedModal;
