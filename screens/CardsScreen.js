import {
  useTheme,
  DarkTheme,
  DefaultTheme,
  useFocusEffect,
  useIsFocused,
  useNavigationState,
} from '@react-navigation/native';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
  ScrollView,
} from 'react-native';
import HomeBanner from '../components/Home/HomeBanner';
import History from '../components/Home/History';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import {useLayoutEffect} from 'react';
function CardsScreen({navigation, route}) {
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    const parent = navigation.getParent('bottombar');
    const routeName = getFocusedRouteNameFromRoute(route);
  });
  return (
    <View style={styles.container}>
      <HomeBanner />
      <ScrollView horizontal={true} style={{marginTop: 16}}>
        <Image
          style={{marginEnd: 16}}
          source={
            localThemes.dark
              ? require('../assets/Home/redcarddark.png')
              : require('../assets/Home/redcard.png')
          }></Image>
        <Image
          style={{marginEnd: 16}}
          source={
            localThemes.dark
              ? require('../assets/Home/bluecarddark.png')
              : require('../assets/Home/bluecard.png')
          }></Image>
        <Image
          style={{marginEnd: 16}}
          source={
            localThemes.dark
              ? require('../assets/Home/greencarddark.png')
              : require('../assets/Home/greencard.png')
          }></Image>
      </ScrollView>
      <History />
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
  });

export default CardsScreen;
