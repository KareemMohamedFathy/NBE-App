import {useEffect, useLayoutEffect, useState} from 'react';
import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useMemo} from 'react/cjs/react.development';
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import auth from '@react-native-firebase/auth';
import {database} from '@react-native-firebase/database';
import axios from 'axios';
function PasswordScreen({navigation}) {
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeconfirmPassword] = useState('');
  const BACKEND_URL = 'https://react-task-c2c86-default-rtdb.firebaseio.com';
  const name = 'Chris';
  function storeuser(phoneno, userid) {
    axios.put(BACKEND_URL + `/Users/${userid}/.json`, {
      phoneno: phoneno,
      userid: userid,
    });
  }

  const [passwordSecure, onChangePasswordSecure] = useState(true);
  const [confirmPasswordSecure, onChangeConfirmPasswordSecure] = useState(true);

  const [hasLowerCase, sethasLowerCase] = useState(false);
  const [hasUpperCase, sethasUpperCase] = useState(false);
  const [hasEight, sethasEight] = useState(false);
  const [hasNumber, sethasNumber] = useState(false);
  const [hasSpecialCharacter, sethasSpecialCharacter] = useState(false);
  function signUp(password) {
    auth()
      .createUserWithEmailAndPassword(phoneno + '@nbe.com', password)
      .then(data => {
        console.log('User account created & signed in!');
        storeuser(phoneno, data.user.uid);
        navigation.navigate('Finished');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton destination={'ConfirmMobile'} />,
    });
  }, [navigation]);
  function goToConfirm() {
    if (!en) {
      sethasUpperCase(true);
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
    } else if (
      !hasEight ||
      !hasLowerCase ||
      !hasSpecialCharacter ||
      !hasUpperCase ||
      !hasNumber
    ) {
      Alert.alert("You don't meet the password criteria");
    } else {
      signUp(password);
    }
  }
  useEffect(() => {
    sethasLowerCase(password.toUpperCase() !== password);
    sethasUpperCase(password.toLowerCase() !== password);

    sethasEight(password.length > 7);
    sethasNumber(/\d/.test(password));
    sethasSpecialCharacter(format.test(password));
    if (!en) {
      sethasUpperCase(true);

      let match = false;
      let arabicnums = '٠١٢٣٤٥٦٧٨٩';
      let count = 0;
      for (let i = 0; i < 10; i++) {
        if (password.includes(arabicnums[i])) {
          match = true;
          count++;
        }
      }
      sethasNumber(match ? true : false);
      sethasLowerCase(password.length == count ? false : true);
    }
  }, [password]);
  const styles = useGlobalStyles();
  const {dark} = useTheme();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const phoneno = useSelector(state => state.counter.phoneno);
  const localThemes = useTheme();
  const [isInputFocused, setIsInputFocused] = useState({
    password: false,
    confirmpassword: false,
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
      <View
        style={{
          flexDirection: en ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
          marginTop: 0,
        }}>
        <BackButton destination="Register" />
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
      <Text style={styles.mobileNum}>{strings.setpassword}</Text>
      <Text style={styles.mobileNumEnter}>{strings.enterpassword}</Text>

      <View
        style={
          isInputFocused.password
            ? [
                styles.password,
                {flexDirection: en ? 'row' : 'row-reverse'},
                {backgroundColor: 'white', borderColor: '#007236'},
              ]
            : [styles.password, , {flexDirection: en ? 'row' : 'row-reverse'}]
        }>
        <Image
          source={require('../assets/lock.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginStart: en ? 20 : 0,
            marginEnd: en ? 0 : 20,
          }}></Image>
        <View
          style={{
            flex: 1,
            marginStart: en ? 20 : 0,
            marginEnd: en ? 0 : 20,
          }}>
          <Text
            style={
              isInputFocused.password ? [styles.labelfocused] : [styles.label]
            }>
            {strings.password}
          </Text>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              paddingHorizontal: 8,
            }}>
            <TextInput
              style={styles.inputpassword}
              onChangeText={onChangePassword}
              value={password}
              placeholder={strings.setpassword}
              onBlur={() => handleInputBlur('password')}
              onFocus={() => handleInputFocus('password')}
              secureTextEntry={passwordSecure}
              placeholderTextColor={!dark ? 'black' : '#B7B7B7'}
            />
            <Pressable
              onPress={() => {
                onChangePasswordSecure(!passwordSecure);
                console.log(passwordSecure);
              }}
              style={{
                position: 'absolute',
                top: 0,
                right: en ? '5%' : '0%',
              }}>
              <Image source={require('../assets/closeeye.png')}></Image>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={
          isInputFocused.confirmpassword
            ? [
                styles.password,
                {flexDirection: en ? 'row' : 'row-reverse'},
                {backgroundColor: 'white', borderColor: '#007236'},
              ]
            : [styles.password, , {flexDirection: en ? 'row' : 'row-reverse'}]
        }>
        <Image
          source={require('../assets/lock.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginStart: en ? 20 : 0,
            marginEnd: en ? 0 : 20,
          }}></Image>
        <View
          style={{flex: 1, marginStart: en ? 20 : 0, marginEnd: en ? 0 : 20}}>
          <Text
            style={
              isInputFocused.confirmpassword
                ? [styles.labelfocused]
                : [styles.label]
            }>
            {strings.confirmpassword}
          </Text>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              paddingHorizontal: 8,
            }}>
            <TextInput
              style={[styles.inputpassword]}
              onChangeText={onChangeconfirmPassword}
              value={confirmPassword}
              placeholder={strings.setpassword}
              onBlur={() => handleInputBlur('confirmpassword')}
              onFocus={() => handleInputFocus('confirmpassword')}
              secureTextEntry={confirmPasswordSecure}
              placeholderTextColor={!dark ? 'black' : '#B7B7B7'}
            />
            <Pressable
              onPress={() => {
                onChangeConfirmPasswordSecure(!confirmPasswordSecure);
                console.log(confirmPasswordSecure);
              }}
              style={{
                position: 'absolute',
                top: 0,
                right: en ? '5%' : '0%',
              }}>
              <Image source={require('../assets/closeeye.png')}></Image>
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: en ? 'column' : 'column-reverse',
          marginTop: en ? 20 : 0,
        }}>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
          }}>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              alignItems: 'center',
              minWidth: '50%',
            }}>
            {hasLowerCase && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasLowerCase && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text
              style={[
                styles.passwordcheck,
                {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
              ]}>
              {strings.lowercase}
            </Text>
          </View>
          {en && (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                minWidth: '50%',
                marginStart: 20,
              }}>
              {hasUpperCase && (
                <Image source={require('../assets/filledcircle.png')}></Image>
              )}
              {!hasUpperCase && (
                <Image
                  source={require('../assets/nonfilledcircle.png')}></Image>
              )}
              <Text style={styles.passwordcheck}>{strings.uppercase}</Text>
            </View>
          )}
          {!en && (
            <View
              style={{
                flexDirection: en ? 'row' : 'row-reverse',
                minWidth: '50%',
                marginStart: 20,

                alignItems: 'center',
              }}>
              {hasSpecialCharacter && (
                <Image source={require('../assets/filledcircle.png')}></Image>
              )}
              {!hasSpecialCharacter && (
                <Image
                  source={require('../assets/nonfilledcircle.png')}></Image>
              )}
              <Text
                style={[
                  styles.passwordcheck,
                  {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
                ]}>
                {strings.specialcharacter}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',

            marginTop: en ? 12 : 0,
            marginBottom: en ? 0 : 12,
          }}>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              alignItems: 'center',
              minWidth: '50%',
            }}>
            {hasEight && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasEight && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text
              style={[
                styles.passwordcheck,
                {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
              ]}>
              {strings.min8}
            </Text>
          </View>
          <View
            style={{
              flexDirection: en ? 'row' : 'row-reverse',
              alignItems: 'center',
              minWidth: '50%',
              marginStart: 20,
            }}>
            {hasNumber && (
              <Image source={require('../assets/filledcircle.png')}></Image>
            )}
            {!hasNumber && (
              <Image source={require('../assets/nonfilledcircle.png')}></Image>
            )}
            <Text
              style={[
                styles.passwordcheck,
                {marginEnd: en ? 0 : 10, marginStart: en ? 10 : 0},
              ]}>
              {strings.number}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {en && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {hasSpecialCharacter && (
                <Image source={require('../assets/filledcircle.png')}></Image>
              )}
              {!hasSpecialCharacter && (
                <Image
                  source={require('../assets/nonfilledcircle.png')}></Image>
              )}
              <Text style={styles.passwordcheck}>
                {strings.specialcharacter}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 25}}>
        <Button onPress={goToConfirm}>Submit</Button>
      </View>
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
      backgroundColor: props.colors.background,
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
    password: {
      marginTop: 20,

      padding: 0,
      flexDirection: 'row',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      backgroundColor: '#FFFFFF',

      alignItems: 'center',
      margin: 0,
      flex: 0.17,
    },
    login: {
      backgroundColor: '#007236',
      padding: 16,
      borderRadius: 13,
      minWidth: '70%',
    },

    inputpassword: {
      fontSize: 16,
      fontWeight: '400',
      color: props.colors.text,
      marginStart: -10,
      marginEnd: -10,
    },

    label: {
      fontSize: 15,
      fontWeight: '700',
      color: '#B7B7B7',
      marginTop: 11,
    },
    labelfocused: {
      fontSize: 15,
      color: '#007236',
      fontWeight: '700',

      marginTop: 11,
    },

    passwordcheck: {
      fontWeight: '400',
      fontSize: 15,
      color: props.colors.text,

      marginLeft: 8,
    },
  });
export default PasswordScreen;
