import {useTheme} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../constants/styles';

function UserInfo({name, email, mobileno}) {
  const {dark} = useTheme();
  const localThemes = useTheme();

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  return (
    <View
      style={{
        flexDirection: en ? 'row' : 'row-reverse',
        paddingVertical: 10,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 29,
        alignItems: 'center',
        flex: 0.35,

        backgroundColor: localThemes.dark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 1)',
      }}>
      <Image
        source={require('../../assets/Benf/user.png')}
        resizeMode="contain"
        style={{width: 60, height: 60, resizeMode: 'cover'}}
      />

      <View
        style={{
          marginStart: en ? 8 : 0,
          marginEnd: en ? 0 : 8,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: localThemes.dark ? '#FFFFFF' : '#1B1B1B',
              marginBottom: 2,
              fontSize: 18,
              fontWeight: '700',
              marginStart: 4,
            }}>
            {name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/Benf/call.png')}
            resizeMode="contain"
            style={{resizeMode: 'cover', marginEnd: 5}}
          />
          <Text
            style={{
              fontSize: 15,
              color: '#B7B7B7',
            }}>
            {mobileno}
          </Text>
        </View>

        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/Benf/money.png')}
            resizeMode="contain"
            style={{
              resizeMode: 'contain',
              marginEnd: 5,
            }}
          />
          <Text
            style={{
              color: localThemes.dark ? '#BABABA' : '#4D4D4D',
              fontSize: 15,
              color: '#B7B7B7',
            }}>
            {email}
          </Text>
        </View>
      </View>
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
export default UserInfo;
