import {
  useTheme,
  DarkTheme,
  DefaultTheme,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../../mythemes/MyDarkTheme';
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
  FlatList,
} from 'react-native';
import MyDefaultTheme from '../../mythemes/MyDefaultTheme';
import {useNavigation} from '@react-navigation/native';
import strings from '../Language/AuthNames';
import {useSelector} from 'react-redux';
function HomeBanner() {
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  const navigation = useNavigation();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  return (
    <View style={[styles.banner, {flexDirection: en ? 'row' : 'row-reverse'}]}>
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Image
          source={
            localThemes.dark
              ? require('../../assets/Home/menudark.png')
              : require('../../assets/Home/menu.png')
          }></Image>
      </Pressable>
      <Image
        source={require('../../assets/Home/profilepic.png')}
        style={styles.profilepic}></Image>
      <Text style={{color: '#B7B7B7'}}>
        {strings.goodmorning} {'\n'}{' '}
        <Text style={styles.username}>{strings.Ahmad}</Text>
      </Text>
      <Image
        source={require('../../assets/Home/notification.png')}
        style={{marginStart: 'auto'}}></Image>
    </View>
  );
}
function useGlobalStyles() {
  const {dark} = useTheme();
  const {colors} = dark ? MyDarkTheme : MyDefaultTheme;
  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => firstStyles({colors}), [colors]);

  return styles;
}
const firstStyles = props =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      paddingTop: 55,
      backgroundColor: props.colors.background,
      flex: 10,
    },
    banner: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilepic: {
      marginHorizontal: 7,
    },
    username: {
      color: props.colors.text,
      fontWeight: '700',
    },
  });

export default HomeBanner;
