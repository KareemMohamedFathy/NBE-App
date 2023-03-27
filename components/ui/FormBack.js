import {Pressable, Image, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BackButton from './BackButton';
function FormBack({destination}) {
  const navigation = useNavigation();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const {dark} = useTheme();
  return (
    <View
      style={{
        flexDirection: en ? 'row' : 'row-reverse',
        justifyContent: 'space-between',
        marginTop: 0,
      }}>
      <View style={{flexDirection: 'row'}}>
        <BackButton />
        <Image
          source={require('../../assets/Home/notification.png')}
          style={{marginStart: 6}}></Image>
      </View>
      <View>
        <Image
          source={
            dark
              ? require('../../assets/darklogo.png')
              : require('../../assets/logogreen.png')
          }
          style={{resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
}
export default FormBack;
