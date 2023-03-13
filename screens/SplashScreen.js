import {useIsFocused, useTheme} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
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
import Button from '../components/ui/Button';

function SplashScreen({navigation}) {
  const isFocused = useIsFocused();
  const localThemes = useTheme();
  useEffect(() => {
    navigation.setOptions({
      tabBarItemStyle: {
        backgroundColor: isFocused ? '#007236' : '#202933',
        margin: 5,
        borderRadius: 16,
      },
    });
  }, []);
  const timerRef = useRef(null); // you can also import useRef() directly from 'react'

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.navigate('LogIn');
    }, 1000);
  }, []);

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <Image
        source={
          localThemes.dark
            ? require('../assets/splashlogodark.png')
            : require('../assets/splashlogo.png')
        }
        style={{marginTop: 'auto', marginBottom: 'auto'}}></Image>
      <Image
        source={
          localThemes.dark
            ? require('../assets/logo.png')
            : require('../assets/logogreen.png')
        }
        style={{marginTop: 'auto', marginBottom: 50}}></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007236',
    paddingTop: 30,
  },
  rootScreen: {
    flex: 1,
    backgroundColor: '#007236',
  },
  backgroundImage: {
    resizeMode: 'stretch',
  },
  logo: {
    marginLeft: 'auto',
    marginTop: 16,
    marginBottom: 16,
  },
  cong: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
});
export default SplashScreen;
