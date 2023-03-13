import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../mythemes/MyDarkTheme';
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
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import VerifyText from '../components/ui/VerifyText';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import MissonCompleteModal from '../components/MissionCompleteModal';

function ConfirmMobileScreen({navigation, route}) {
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(
    () => setTimer(currTimer => currTimer - 1),
    [],
  );
  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);
  const {mobileNum, source} = route.params ? route.params : '';
  function goToPassword() {
    navigation.navigate('Password');
  }
  const [visible, setVisible] = useState(false);
  function isVisible() {
    setVisible(!visible);
  }
  function setModal() {
    setVisible(true);
  }
  function onFinish() {
    setVisible(!visible);
    navigation.navigate(
      source === 'AddBeneficiaries' ? 'MyBeneficiaries' : 'Transfer',
      {
        mobileNum: 'sss',
      },
    );
  }

  const styles = useGlobalStyles();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const localThemes = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: en ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
        }}>
        <BackButton
          destination={
            source == 'AddBeneficiaries' ? 'AddBeneficiaries' : 'Register'
          }
        />
        <View>
          <Image
            source={
              localThemes.dark
                ? require('../assets/darklogo.png')
                : require('../assets/logogreen.png')
            }
            style={{resizeMode: 'cover'}}
          />
        </View>
      </View>

      <Text style={styles.mobileNum}>
        {source === 'Transfer' ? strings.otp : strings.verification}
      </Text>
      <Text style={styles.mobileNumEnter}>
        {strings.enterverification}
        {mobileNum}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <VerifyText />
        <VerifyText />
        <VerifyText />
        <VerifyText />
        <VerifyText />
      </View>
      <Text style={styles.mobileNumEnter}>{strings.nocode}</Text>
      <Text style={[styles.mobileNum, {marginTop: 5}]}>
        {strings.reqnewcode + ' 00:' + timer}
      </Text>

      <View
        style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 25}}>
        <Button
          onPress={() => {
            source === 'AddBeneficiaries' || source === 'Transfer'
              ? setModal()
              : goToPassword();
          }}>
          {strings.submit}
        </Button>
      </View>
      <MissonCompleteModal
        modalon={visible}
        onPress={isVisible}
        onFinish={onFinish}
        source={source}></MissonCompleteModal>
    </View>
  );
}
function useGlobalStyles() {
  const {dark} = useTheme();
  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => firstStyles({colors}), [colors]);

  return styles;
}
const statusBarHeight = StatusBar.currentHeight;

const firstStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.backgroundColor,
      paddingHorizontal: 25,
      marginTop: statusBarHeight + 5,
    },

    mobileNum: {
      fontSize: 20,
      fontWeight: '700',
      color: props.colors.text,
      marginTop: 30,
    },
    mobileNumEnter: {
      fontSize: 16,
      fontWeight: '400',
      color: '#B7B7B7',
      marginTop: 5,
    },

    login: {
      backgroundColor: '#007236',
      padding: 16,
      borderRadius: 13,
      minWidth: '70%',
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
      marginLeft: 23,
      marginTop: 11,
    },
    footer: {
      marginTop: 25,
      fontWeight: '400',
      fontSize: 14,
      color: '#808080',
    },
    specialfooter: {
      fontWeight: '700',
      color: 'black',
    },
  });
export default ConfirmMobileScreen;
