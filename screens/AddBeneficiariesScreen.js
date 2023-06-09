import {useIsFocused, useTheme} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';

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
import SelectDropdown from 'react-native-select-dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {ScrollView} from 'react-native-gesture-handler';
import {ref} from 'firebase/storage';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import {Formik} from 'formik';
import CustomTextInput from '../components/ui/CustomTextInput';
import FormBack from '../components/ui/FormBack';
import getAllUsers, {Remote, addBeneficiaries} from '../DB/Remote';
import {useMutation, useQuery, useQueryClient} from 'react-query';

function AddBeneficiariesScreen({navigation}) {
  const localThemes = useTheme();
  const queryClient = useQueryClient();

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const styles = useGlobalStyles();
  const windowHeight = Dimensions.get('window').height;
  const [imageuri, setImageUri] = useState('');
  const [userDeviceToken, setUserDeviceToken] = useState('');

  const [response, setResponse] = useState('');

  const uid = firebase.auth().currentUser?.uid;
  const mutation = useMutation({
    mutationFn: values => addBeneficiaries(values),
    onSuccess: () => {
      queryClient.invalidateQueries('getBenefeciaries');
    },
  });

  const {data, isSuccess} = useQuery('allUsers', getAllUsers, {
    onSuccess: data => {},
  });
  const [isInputFocused, setIsInputFocused] = useState({
    firstname: false,
    lastname: false,
    branch: false,
    accountno: false,
    phoneno: false,
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

  function confirmAddingBen(values) {
    storeBenefeciary(values);
  }
  const BACKEND_URL = 'https://react-task-c2c86-default-rtdb.firebaseio.com';
  async function verifyUserEmail(phoneno) {
    const response = data;
    console.log(phoneno + 'phoeno');
    for (const key in response) {
      const userphoneno = response[key].phoneno;
      const devicetoken = response[key].devicetoken;
      if (phoneno === userphoneno) {
        setUserDeviceToken(devicetoken);
        return devicetoken;
      }
    }
  }

  async function storeBenefeciary(values) {
    values.image = await uploadImage();
    values.myid = uid;

    const devicetoken = await verifyUserEmail(values.phoneno);
    console.log('waiting');
    console.log(devicetoken);
    values.devicetoken = devicetoken;

    if (devicetoken) {
      mutation.mutate(values);
      navigation.navigate('ConfirmMobile', {
        source: 'AddBeneficiaries',
        mobileNum: values.phoneno,
      });
    } else {
      Alert.alert(
        'Mobile number',
        'This user doesnot exist make sure the mobile number you entered is registered in the app',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  }
  function openCamera() {
    const options = {
      storageOptions: {
        mediatype: 'photo',
        path: 'images',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('cancel');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setResponse(response);

        setImageUri(source);
      }
    });
  }
  async function uploadImage() {
    const reference = storage().ref('/image/' + response.assets[0].fileName);
    const path = response.assets[0].uri;

    const task = await reference.putFile(path);
    const z = await storage()
      .ref('/image/' + response.assets[0].fileName)
      .getDownloadURL();
    return z;
  }

  return (
    <ScrollView contentContainerStyle={{height: windowHeight + 150}}>
      <View style={styles.container}>
        <FormBack />

        <Pressable style={styles.camera} onPress={() => openCamera()}>
          <View>
            <Image
              source={
                imageuri === ''
                  ? require('../assets/Benf/camera.png')
                  : imageuri
              }
              style={{
                height: imageuri === '' ? 40 : 80,
                width: imageuri === '' ? 44 : 80,
                resizeMode: 'cover',
                marginStart: en ? 6 : 0,
                marginEnd: en ? 0 : 6,
              }}
            />
          </View>
        </Pressable>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            branch: '',
            accountno: '',
            phoneno: '',
            email: '',
            image: '',
            myid: '',
          }}
          onSubmit={values => confirmAddingBen(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={{flex: 1}}>
              <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
                <CustomTextInput
                  label={strings.firstname}
                  value={values.firstname}
                  onChangeText={handleChange('firstname')}
                  placeholder={strings.firstname}
                />
                <CustomTextInput
                  label={strings.lastname}
                  value={values.lastname}
                  onChangeText={handleChange('lastname')}
                  placeholder={strings.lastname}
                />
              </View>
              <View style={{backgroundColor: 'white', marginTop: 16}}>
                <Text
                  style={
                    isInputFocused.branch
                      ? [styles.label, {color: '#007236'}]
                      : [styles.label, {color: 'black'}]
                  }>
                  {strings.bankbranch}
                </Text>
                <SelectDropdown
                  defaultButtonText={en ? 'Select branch' : 'اختار فرع البنك'}
                  data={[
                    en ? '043 - Water Way Mall' : ' 043 - فرع واتر واي مول ',
                    en ? '045 - City Stars Mall' : ' 045 - فرع سيتي ستارز ',
                  ]}
                  onSelect={(selectedItem, index) => {
                    values.branch = selectedItem;
                  }}
                  renderDropdownIcon={() => {
                    return (
                      <Image source={require('../assets/Benf/down.png')} />
                    );
                  }}
                  dropdownIconPosition={en ? 'right' : 'left'}
                  buttonStyle={{
                    width: '100%',
                    backgroundColor: 'white',
                    alignItems: en ? 'flex-end' : 'flex-start',
                    flexDirection: 'column',
                  }}
                  buttonTextStyle={{
                    fontSize: 16,
                    alignSelf: en ? 'flex-start' : 'flex-end',
                  }}
                  onFocus={() => handleInputFocus('branch')}
                  onBlur={() => handleInputFocus('branch')}
                />
              </View>

              <CustomTextInput
                label={strings.accountno}
                value={values.accountno}
                onChangeText={handleChange('accountno')}
                placeholder={strings.accountno}
              />

              <CustomTextInput
                label={strings.phoneno}
                value={values.phoneno}
                onChangeText={handleChange('phoneno')}
                placeholder={strings.phoneno}
              />

              <CustomTextInput
                label={strings.email}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder={strings.phoneno}
              />

              <Button
                style={{flex: 1}}
                bstyle={{marginVertical: 25}}
                onPress={handleSubmit}>
                {strings.addbeneficiar}
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
      paddingHorizontal: 25,
      marginTop: 55,
      backgroundColor: props.colors.background,
      flex: 1,
    },
    camera: {
      marginTop: 20,
      backgroundColor: 'white',
      borderRadius: 30,
      marginHorizontal: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.22,
    },
    input: {
      fontSize: 16,
      fontWeight: '400',
      color: props.colors.text,
      marginHorizontal: 13,
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
      borderRadius: 10,
      margin: 0,
      flex: 1,
      backgroundColor: props.colors.card,
    },
  });
export default AddBeneficiariesScreen;
