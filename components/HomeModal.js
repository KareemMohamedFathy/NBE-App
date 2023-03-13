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
import strings from './Language/AuthNames';
import {useSelector} from 'react-redux';
import ActionSheet, {
  registerSheet,
  SheetManager,
} from 'react-native-actions-sheet';

function HomeModal(props) {
  const a = props.modalon;
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  return (
    <ActionSheet containerStyle={styles.container}>
      <View style={{}}>
        <Text style={styles.header}>{strings.fingerPrint}</Text>
        <Text style={styles.subheader}>{strings.fingerPrintLogin}</Text>

        <Pressable
          onPress={() => {
            props.payload?.value();
            SheetManager.hide('FingerPrintHomeModal');
          }}>
          <Image
            source={
              localThemes.dark
                ? require('../assets/fingerprintactivedark.png')
                : require('../assets/fingerprintactive.png')
            }
            style={styles.fingerprint}></Image>
        </Pressable>
        <Text style={styles.footer}>{strings.touch}</Text>

        <Pressable
          onPress={() => {
            props.payload?.tryagain();
            SheetManager.hide('FingerPrintHomeModal');
          }}
          style={{flexDirection: en ? 'row' : 'row-reverse'}}>
          <Text style={[styles.cancel, {flexDirection: 'row-reverse'}]}>
            {strings.cancel}
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
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
      marginTop: 17,
      color: props.colors.text,
      fontWeight: '700',
      fontSize: 20,
    },
    subheader: {
      marginTop: 12,
      color: props.colors.text,
      fontWeight: '400',
      fontSize: 14,
    },
    fingerprint: {
      marginStart: 'auto',
      marginEnd: 'auto',
      marginTop: 35,
    },
    footer: {
      marginTop: 15,
      fontSize: 16,
      color: '#B7B7B7',
      textAlign: 'center',
    },
    cancel: {
      color: '#007236',
      fontSize: 16,
      fontWeight: '700',
      marginStart: 'auto',
      marginTop: 8,
    },
    container: {
      backgroundColor: props.colors.secondaryBackground,
      minHeight: '37%',
      borderRadius: 18,
      paddingHorizontal: 25,
    },
  });

export default HomeModal;
registerSheet('FingerPrintHomeModal', HomeModal);
