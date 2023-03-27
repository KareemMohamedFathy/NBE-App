import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useMemo, useState} from 'react';
import Moment from 'moment';
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
import {ScrollView} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import BackButton from '../components/ui/BackButton';

import Button from '../components/ui/Button';
import CustomDropDown from '../components/ui/CustomDropDown';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {firebase} from '@react-native-firebase/auth';
import {Formik} from 'formik';
import CustomTextInput from '../components/ui/CustomTextInput';

function TransferScreen({navigation, route}) {
  const isFocused = useIsFocused();
  const localThemes = useTheme();
  const BACKEND_URL = 'https://react-task-c2c86-default-rtdb.firebaseio.com';
  const {benid, phoneno, devicetoken} = route.params ? route.params : '';

  const currentL = useSelector(state => state.counter.value);
  const [transferamount, setTransferamount] = useState('');
  const uid = firebase.auth().currentUser?.uid;
  const [transferreason, setTransferreason] = useState('');

  const en = currentL === 'en';
  const styles = useGlobalStyles();
  let transfer = {
    amount: transferamount,
    title: transferreason,
    date: Moment(new Date()).format('DD-MM-YYYY'),
    sender: uid ? uid : 'me',
    reciever: benid,
  };

  const [isInputFocused, setIsInputFocused] = useState({
    transferamount: false,
    transferreason: false,
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
  const windowHeight = Dimensions.get('window').height;
  function gotoconfirm(values) {
    storeTransfer(values);
    navigation.navigate('ConfirmMobile', {
      source: 'Transfer',
    });
  }
  // async function getUserToken() {
  //   const response = await axios.get(
  //     BACKEND_URL + `/Users.json?orderBy="phoneno"&equalTo="${phoneno}"`,
  //   );
  //   let devicetoken = '';

  //   for (const key in response.data) {
  //     devicetoken = response.data[key].devicetoken;
  //   }
  //   return devicetoken;
  // }
  async function storeTransfer(values) {
    values.date = transfer.date;
    values.reciever = transfer.reciever;
    values.sender = transfer.sender;
    console.log('Values');
    console.log(values);
    axios.post(BACKEND_URL + '/Transfer.json', values);
    //const devicetoken = await getUserToken();
    await sendPushNotification(devicetoken);
  }
  async function sendPushNotification(devicetoken) {
    const FIREBASE_API_KEY =
      'AAAA7hQxbp8:APA91bFW4th5uoFDwXd2SbnIOQvLOHm4zUm6x3tnqFCTXaE78jyVWUhHKvFABj3N0o0RDunt5EwPll-zWc39EUVKHrC_A_Vx_5xDVrmcm0JuH06hkKDhydvlSwuXsg__TGebkBtJ76Ed';
    const message = {
      registration_ids: [
        devicetoken, // 'cbXgpm2GTgyqR5-_Lj_r4C:APA91bG1kcJ9PGG4kl6UvYuAm4tNffoFhpy2g0BByjzCb-63pTt09bbABZhHg2Cj0sPlHQD-14iMK3tCnvndmSIwlRbcN4f2FdSNjQoxGThqQgzIDOiYDJcEH517KOajSYWsfjgYtjNE',
        ,
      ],
      notification: {
        title: 'Money Recieved',
        body: 'Money was transfered to your account',
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: 'high',
        content_available: true,
      },
      data: {
        title: 'Money Recieved',
        body: 'Money was transfered to your account',

        score: 50,
        wicket: 1,
      },
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'key=' + FIREBASE_API_KEY,
    });

    let response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers,
      body: JSON.stringify(message),
    });
  }

  return (
    <ScrollView contentContainerStyle={{height: 800}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackButton destination="Beneficiaries" />
          </View>

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
        <Text style={styles.title}>{strings.transfer}</Text>
        <CustomDropDown label={strings.typeoftransfer} />
        <CustomDropDown label={strings.transferfrom} />
        <CustomDropDown label={strings.transferto} />
        <Formik
          initialValues={{
            title: '',
            amount: '',
            reciever: '',
            sender: '',
            date: '',
          }}
          onSubmit={values => gotoconfirm(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={{flex: 1}}>
              <CustomTextInput
                label={strings.amount}
                value={values.transferamount}
                onChangeText={handleChange('amount')}
                placeholder={strings.amountotransfer}
                keyboardType={'number-pad'}
              />
              <CustomTextInput
                label={strings.reasontotransfer}
                value={values.transferreason}
                onChangeText={handleChange('title')}
                placeholder={strings.reasontotransfer}
              />
              <Button bstyle={{marginTop: 24}} onPress={() => handleSubmit()}>
                {strings.transfer}{' '}
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
function useGlobalStyles() {
  const {dark} = useTheme();
  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => firstStyles({colors}), [colors]);

  return styles;
}
const firstStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.background,
      paddingTop: 55,
      paddingHorizontal: 25,
    },
    title: {
      fontSize: 20,
      color: props.colors.text,
      fontWeight: '700',
      marginTop: 30,
    },

    label: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
      marginTop: 11,
      marginStart: 16,
      marginEnd: 16,
    },
    password: {
      marginTop: 20,
      padding: 0,
      backgroundColor: props.colors.backgroundColor,
      flexDirection: 'row',
      borderRadius: 15,
      margin: 0,
      flex: 0.25,
      backgroundColor: props.colors.card,
    },
    input: {
      fontSize: 16,
      fontWeight: '400',
      color: props.colors.text,
      marginHorizontal: 13,
    },
  });
export default TransferScreen;
