import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
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
import {useMemo} from 'react/cjs/react.development';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {useDispatch, useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import {updateMyPhoneno} from '../counter/CounterSlice';
import CustomTextInput from '../components/ui/CustomTextInput';

function RegisterScreen({navigation}) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  const localThemes = useTheme();
  const [mobile, onChangeMobile] = useState('');
  const styles = useGlobalStyles();
  const dispatch = useDispatch();
  const [isInputFocused, setIsInputFocused] = useState({
    mobileno: false,
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
  function goToConfirm() {
    dispatch(updateMyPhoneno(mobile));
    navigation.navigate('ConfirmMobile', {
      mobileNum: mobile,
    });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: en ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
        }}>
        <BackButton destination="LogIn" />
        <View style={{alignItems: 'flex-end'}}>
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
      <Text style={styles.mobileNum}>{strings.mobileno}</Text>
      <Text style={styles.mobileNumEnter}>{strings.mobilenoetner}</Text>

      <View
        style={[
          isInputFocused.mobileno
            ? [
                styles.textinput,
                {flexDirection: en ? 'row' : 'row-reverse'},
                {backgroundColor: 'white', borderColor: '#007236'},
              ]
            : [styles.textinput, , {flexDirection: en ? 'row' : 'row-reverse'}],
          {flexDirection: en ? 'row' : 'row-reverse'},
        ]}>
        <Image
          source={require('../assets/mobile.png')}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginStart: en ? 24 : 0,
            marginEnd: en ? 0 : 20,
          }}></Image>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={
              isInputFocused.mobileno ? [styles.labelfocused] : [styles.label]
            }>
            {strings.mobileno}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeMobile}
            value={mobile}
            placeholder="+20 101 131 5412"
            placeholderTextColor={localThemes.colors.text}
            keyboardType={'phone-pad'}
            onBlur={() => handleInputBlur('mobileno')}
            onFocus={() => handleInputFocus('mobileno')}
          />
        </View>
      </View>

      <View
        style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 25}}>
        <Button onPress={goToConfirm}>{strings.next}</Button>
        <Text style={styles.footer}>
          {strings.termsofservice[0]}
          <Text style={styles.specialfooter}>
            {' '}
            {strings.termsofservice[1]}
          </Text>{' '}
          {strings.termsofservice[2]}
          <Text style={styles.specialfooter}> {strings.termsofservice[3]}</Text>
          .
        </Text>
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
    label: {
      fontWeight: '700',

      fontSize: 16,
      color: 'black',
      marginHorizontal: 23,
      marginTop: 11,
    },

    labelfocused: {
      fontSize: 16,
      color: '#007236',
      fontWeight: '700',

      marginHorizontal: 23,
      marginTop: 11,
    },
    textinput: {
      marginTop: 20,

      padding: 0,
      flexDirection: 'row',
      borderRadius: 12,
      borderStyle: 'solid',
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      backgroundColor: '#FFFFFF',

      alignItems: 'center',
      margin: 0,
      flex: 0.17,
    },

    input: {
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
      marginStart: 20,
    },
    login: {
      backgroundColor: props.colors.backgroundColor,
      padding: 16,
      borderRadius: 13,
      minWidth: '70%',
    },

    footer: {
      marginTop: 25,
      fontWeight: '400',
      fontSize: 18,
      color: '#808080',
    },
    specialfooter: {
      fontWeight: '700',
      color: props.colors.text,
    },
  });
export default RegisterScreen;
