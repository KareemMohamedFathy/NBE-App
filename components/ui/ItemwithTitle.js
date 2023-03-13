import {useTheme} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../constants/styles';

function ItemwithTitle({title, subtitle, img, endimage, flex}) {
  const {dark} = useTheme();
  const localThemes = useTheme();

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  return (
    <View
      style={{
        flexDirection: en ? 'row' : 'row-reverse',
        marginStart: en ? 5 : 0,
        marginEnd: en ? 0 : 5,
        flex: flex,
      }}>
      <Image
        source={img}
        resizeMode="contain"
        style={{resizeMode: 'contain', marginEnd: 5}}
      />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 18, color: '#1C2437', marginStart: 8}}>
          {title}
        </Text>
        <Text style={{color: '#848484', fontSize: 14, marginStart: 6}}>
          {subtitle}
        </Text>
      </View>
      <Image
        source={endimage}
        resizeMode="contain"
        style={{
          resizeMode: 'contain',
          marginStart: 'auto',
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  outercontainer: {
    width: 80,
    marginEnd: 13,
    marginTop: 10,
  },
  bstyle: {
    borderRadius: 13,
    height: 90,
    alignItems: 'center',
  },
  textstyle: {
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
    fontWeight: '400',
    margin: 0,
    padding: 0,
    color: '#1C2437',
  },
});
export default ItemwithTitle;
