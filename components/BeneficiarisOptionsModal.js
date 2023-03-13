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
import BeneficiariesDetailedCard from './ui/BeneficiariesDetailedCard';
import UserInfo from './ui/UserInfo';
import ItemwithTitle from './ui/ItemwithTitle';
import {useNavigation} from '@react-navigation/native';

function BeneficiarisOptionsModal(props) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const navigation = useNavigation();
  const benid = props.benid ? props.benid : '';

  const a = props.modalon;
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  function goToTransfer() {
    props.onPress();
    navigation.navigate('Transfer', {
      benid: benid,
    });
  }
  const allbendata = props.bendata;
  return (
    <Modal
      transparent={true}
      visible={props.modalon}
      statusBarTranslucent={true}
      onBackdropPress={props.onPress}
      style={{margin: 0}}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'rgba(28, 36, 55, 0.77)',
            flex: 1,
          }}>
          <View style={styles.container}>
            <UserInfo
              name={
                allbendata
                  ? allbendata?.firstname + allbendata.lastname
                  : 'User'
              }
              email={allbendata ? allbendata?.email : '123@gmail.com'}
              mobileno={allbendata ? allbendata?.phoneno : '+20121'}
            />
            <Pressable style={{flex: 0.25}} onPress={() => goToTransfer()}>
              <ItemwithTitle
                img={require('../assets/Benf/transfer.png')}
                subtitle={
                  props.bendata
                    ? 'Transfer money to ' + props?.bendata?.firstname
                    : 'Transfer money to reciever'
                }
                title={'Transfer'}
                flex={1}
                endimage={require('../assets/Benf/mediumfingerprint.png')}
              />
            </Pressable>

            <ItemwithTitle
              img={require('../assets/Benf/edit.png')}
              subtitle={
                props.bendata
                  ? 'Edit ' + props?.bendata?.firstname + ' Data'
                  : 'Edit User Data'
              }
              title={'Edit'}
              flex={0.25}
            />

            <Pressable
              style={{flex: 0.25}}
              onPress={() => props.onDelete(props.bendata?.benid)}>
              <ItemwithTitle
                img={require('../assets/Benf/delete.png')}
                subtitle={
                  props.bendata
                    ? 'Delete ' +
                      props.bendata?.firstname +
                      ' & his / her transactions history'
                    : 'Delete User & her transactions history'
                }
                title={
                  props.bendata
                    ? 'Delete ' + props.bendata?.firstname
                    : 'Delete User '
                }
                flex={1}
              />
            </Pressable>
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
    container: {
      backgroundColor: 'white',
      maxHeight: '35%',
      flex: 1,
      paddingHorizontal: 18,
      borderRadius: 18,
      marginTop: 'auto',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  });
export default BeneficiarisOptionsModal;
