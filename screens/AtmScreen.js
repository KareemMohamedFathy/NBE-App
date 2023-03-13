import {useIsFocused, useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
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

function AtmScreen({navigation}) {
  const isFocused = useIsFocused();
  const localThemes = useTheme();

  useEffect(() => {
    navigation.setOptions({
      tabBarLabelStyle: {
        textAlign: 'center',
        marginBottom: 8,
        // color: isFocused ? '#FFFFFF' : '#B7B7B7',
        fontSize: 11,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/finished.png')}
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
          <View style={{paddingHorizontal: 25, flex: 1}}>
            <Text style={styles.cong}>Congratulations</Text>

            <Text style={[styles.cong, {fontSize: 16, fontWeight: '400'}]}>
              You have successfully registered in NBE online banking service
            </Text>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 'auto',
                marginBottom: 25,
              }}>
              <Button
                bstyle={{backgroundColor: 'white'}}
                textstyle={{color: '#007236'}}>
                Finish
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
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
export default AtmScreen;
