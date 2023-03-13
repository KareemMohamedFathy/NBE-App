import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  Modal,
  TouchableOpacity,
  I18nManager,
  Alert,
  DevSettings,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import strings from '../components/Language/AuthNames';
import {useEffect, useState} from 'react';
import Button from '../components/ui/Button';
import AppModal from '../components/AppModal';
import {BlurView} from '@react-native-community/blur';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../counter/CounterSlice';
import auth from '@react-native-firebase/auth';
import {SheetManager} from 'react-native-actions-sheet';

function LogInScreen({navigation}) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [bgColor, setbgColor] = useState('rgba(0, 0, 0, 0.6)');
  const [visible, setVisible] = useState(false);
  function setModal() {
    SheetManager.hide('FingerPrintModal');
    SheetManager.hide('FingerPrintModal');

    SheetManager.show('FingerPrintModal');
  }
  function signIn(email, password) {
    auth()
      .signInWithEmailAndPassword(email + '@nbe.com', password)
      .then(cred => {
        navigation.navigate('Root', {
          id: cred.uid,
        });
      })
      .catch(error => {
        console.log('Password or email is incorrect');

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
  }
  function gotoRegister() {
    navigation.navigate('Register');
  }
  function gotoHome() {
    if (email.length > 0 && password.length > 0) {
      navigation.navigate('Root');
      signIn(email, password);
    }
  }
  function changeL() {
    dispatch(changeLanguage());
  }
  const [isInputFocused, setIsInputFocused] = useState({
    password: false,
    email: false,
  });

  const handleInputFocus = textinput => {
    setIsInputFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsInputFocused({
      [textinput]: false,
    });
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar translucent={true} backgroundColor="transparent" /> */}
      <ImageBackground
        source={require('../assets/bankBackground.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>
        <View style={[styles.outercontainer, {backgroundColor: bgColor}]}>
          <View style={styles.innercontainer}>
            <Button
              bstyle={styles.language}
              textstyle={styles.text}
              onPress={changeL}>
              {strings.language}
            </Button>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}></Image>
          </View>
          <View style={styles.appheader}>
            <Text style={styles.header}>
              {strings.welcome} {'\n'}
            </Text>
          </View>
          <View style={[styles.form]}>
            <View
              style={
                isInputFocused.email
                  ? [
                      styles.email,
                      {flexDirection: en ? 'row' : 'row-reverse'},
                      {backgroundColor: 'white', borderColor: '#007236'},
                    ]
                  : [
                      styles.email,
                      ,
                      {flexDirection: en ? 'row' : 'row-reverse'},
                    ]
              }>
              <Image
                source={require('../assets/@.png')}
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginStart: en ? 24 : 5,
                  marginEnd: en ? 0 : 24,
                  tintColor: !isInputFocused.email ? '#FFFFFF' : '#B7B7B7',
                }}></Image>
              <View style={{flex: 1}}>
                <Text
                  style={
                    isInputFocused.email
                      ? [styles.labelfocused]
                      : [styles.label]
                  }>
                  {strings.userName}
                </Text>
                <TextInput
                  style={
                    !isInputFocused.email
                      ? [styles.inputemail, {color: 'white'}]
                      : [styles.inputemail, {color: 'black'}]
                  }
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder={strings.userPlaceHolder}
                  placeholderTextColor={
                    isInputFocused.email ? 'black' : 'white'
                  }
                  onBlur={() => handleInputBlur('email')}
                  onFocus={() => handleInputFocus('email')}
                />
              </View>
            </View>
            <View
              style={
                isInputFocused.password
                  ? [
                      styles.password,
                      {flexDirection: en ? 'row' : 'row-reverse'},
                      {backgroundColor: 'white', borderColor: '#007236'},
                    ]
                  : [
                      styles.password,
                      {flexDirection: en ? 'row' : 'row-reverse'},
                    ]
              }>
              <Image
                source={require('../assets/lock.png')}
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginStart: en ? 24 : 5,
                  marginEnd: en ? 0 : 24,

                  tintColor: !isInputFocused.password ? '#FFFFFF' : '#B7B7B7',
                }}></Image>
              <View style={{flex: 1}}>
                <Text
                  style={
                    isInputFocused.password
                      ? [styles.labelfocused]
                      : [styles.label]
                  }>
                  {strings.password}
                </Text>
                <TextInput
                  style={
                    !isInputFocused.password
                      ? [styles.inputpassword, {color: 'white'}]
                      : [styles.inputpassword, {color: 'black'}]
                  }
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder={strings.passwordPlaceHolder}
                  placeholderTextColor={
                    isInputFocused.password ? 'black' : 'white'
                  }
                  onBlur={() => handleInputBlur('password')}
                  onFocus={() => handleInputFocus('password')}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1.5}}>
            <View
              style={{
                flexDirection: en ? 'row' : 'row-reverse',
                marginLeft: 20,
                marginTop: 15,
                alignItems: 'center',
                flex: 1,
              }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text
                style={[
                  styles.label,
                  {marginStart: 0, marginTop: 0, marginEnd: 0},
                ]}>
                {strings.Rememberme}
              </Text>
              <Text
                style={{marginLeft: 'auto', color: 'white', marginRight: 25}}>
                {strings.Forgotpassword}
              </Text>
            </View>
            <View
              style={{
                flexDirection: en ? 'row' : 'row-reverse',
                marginLeft: 20,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginEnd: 16,
                flex: 2,
              }}>
              <Button
                bstyle={styles.login}
                onPress={gotoHome}
                textstyle={[
                  {textAlign: 'center', color: 'white', fontSize: 18},
                ]}>
                {strings.LogIn}
              </Button>
              <Pressable
                onPress={() => {
                  setModal();
                }}>
                <Image
                  source={require('../assets/fingerprint.png')}
                  style={{marginStart: 'auto'}}></Image>
              </Pressable>
            </View>
            <View style={{alignItems: 'center', marginTop: 15, flex: 1}}>
              <Pressable onPress={gotoRegister}>
                <Text style={{fontSize: 18, color: 'white'}}>
                  {strings.noAccount}{' '}
                  <Text
                    style={{color: '#F6A721', textDecorationLine: 'underline'}}>
                    {strings.signUp}
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.bbanner}>
            <View style={styles.contact}>
              <Text style={{fontSize: 16, color: '#F6A721', marginTop: 16}}>
                {' '}
                {strings.contactUs} <Text style={{color: 'white'}}>-</Text>{' '}
                {strings.faqs} <Text style={{color: 'white'}}>-</Text>{' '}
                {strings.help}
              </Text>
            </View>
            <Text style={{fontSize: 13, color: 'white', marginTop: 8}}>
              {strings.copyright}
            </Text>
          </View>
        </View>
      </ImageBackground>
      {/* {visible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      )} */}
      <View></View>
    </View>
  );
}
const statusBarHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  outercontainer: {
    flex: 1,
    paddingTop: statusBarHeight + 5,
    paddingHorizontal: 25,
  },
  start: {
    marginTop: 40,
    fontSize: 55,
  },
  absolute: {
    backgroundColor: 'rgba(28, 36, 55, 0.77)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1.0)',
  },
  backgroundImage: {
    resizeMode: 'stretch',
  },
  logo: {},
  language: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    color: '#007236',
  },
  text: {
    color: '#007236',
    fontSize: 24,

    fontWeight: '500',
  },
  innercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flex: 0.4,
  },

  appheader: {
    flex: 1.7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 40,
    color: 'white',
    marginTop: 'auto',
    marginBottom: 40,
    fontWeight: '700',
  },
  form: {
    flex: 1.4,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 23,
    marginTop: 11,
    fontWeight: '700',
  },

  labelfocused: {
    fontSize: 16,
    color: 'green',
    marginHorizontal: 23,
    marginTop: 11,
    fontWeight: '700',
  },

  email: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1.5,
    flex: 1,
    minWidth: '100%',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  inputemail: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginStart: 20,
  },

  password: {
    marginTop: 20,

    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',

    alignItems: 'center',
    margin: 0,
    flex: 1,
  },

  inputpassword: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginStart: 20,
  },
  login: {
    backgroundColor: '#007236',
    padding: 16,
    borderRadius: 13,
    minWidth: '70%',
  },
  bbanner: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 0.6,
    marginTop: 20,
    marginHorizontal: -25,
  },
  contact: {
    flexDirection: 'row',
  },
  copyright: {
    flexDirection: 'row',
  },
});

export default LogInScreen;
