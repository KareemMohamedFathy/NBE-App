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
import {useDispatch, useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import Button from '../components/ui/Button';
import {changeLanguage} from '../counter/CounterSlice';

function FinishScreen({navigation}) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const dispatch = useDispatch();

  function gotoHome() {
    navigation.navigate('Root');
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: en ? 'row-reverse' : 'row'}}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}></Image>
      </View>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/finished.png')}
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
          <View style={{paddingHorizontal: 25, flex: 1}}>
            <Text style={[styles.cong, {marginEnd: en ? 0 : 10}]}>
              {strings.congratulations}
            </Text>

            <Text style={[styles.cong, {fontSize: 17, fontWeight: '400'}]}>
              {strings.finishedregister}
            </Text>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 'auto',
                marginBottom: 25,
              }}>
              <Button
                bstyle={{backgroundColor: 'white'}}
                textstyle={{color: '#007236'}}
                onPress={gotoHome}>
                {strings.finish}
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
    marginTop: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  cong: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
});
export default FinishScreen;
