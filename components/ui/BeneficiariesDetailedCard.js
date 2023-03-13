import {useTheme} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../constants/styles';

function BeneficiariesDetailedCard({itemdata, onPress, onOptions}) {
  const {dark} = useTheme();
  const localThemes = useTheme();

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  return (
    <Pressable onPress={() => onPress(itemdata)}>
      <View
        style={{
          flexDirection: en ? 'row' : 'row-reverse',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderColor: 'white',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 29,
          marginBottom: 20,
          alignItems: 'center',

          backgroundColor: localThemes.dark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 1)',
        }}>
        <Image
          source={{uri: itemdata.item.image}}
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
              }}>
              {itemdata.item.firstname}
            </Text>
            <Pressable
              style={{
                alignSelf: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}
              onPress={() => {
                onOptions();
              }}>
              <Image
                source={require('../../assets/Benf/options.png')}
                resizeMode="contain"
                style={{
                  resizeMode: 'contain',
                  marginEnd: 5,
                }}
              />
            </Pressable>
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
                color: localThemes.dark ? '#BABABA' : '#4D4D4D',
                fontSize: 15,
                color: '#B7B7B7',
              }}>
              {itemdata.item.phoneno}
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
                resizeMode: 'cover',
                marginEnd: 5,
              }}
            />
            <Text
              style={{
                color: localThemes.dark ? '#BABABA' : '#4D4D4D',
                fontSize: 15,
                color: '#B7B7B7',
              }}>
              $802,828.61
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
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
export default BeneficiariesDetailedCard;
