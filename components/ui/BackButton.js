import {Pressable, Image} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
function BackButton({destination}) {
  const navigation = useNavigation();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const {dark} = useTheme();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Image
        source={
          !dark
            ? en
              ? require('../../assets/back.png')
              : require('../../assets/backar.png')
            : en
            ? require('../../assets/backdark.png')
            : require('../../assets/backar.png')
        }
        style={{resizeMode: 'cover'}}
      />
    </Pressable>
  );
}
export default BackButton;
