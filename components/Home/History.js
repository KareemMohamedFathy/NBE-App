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
  ScrollView,
} from 'react-native';
import MyDefaultTheme from '../../mythemes/MyDefaultTheme';
import {useSelector} from 'react-redux';
import strings from '../Language/AuthNames';
function History() {
  const history = [
    {username: 'Carrefour', img: require('../../assets/Home/carrefour.png')},
    {username: 'Amazon', img: require('../../assets/Home/amazon.png')},
    {username: 'Jumia', img: require('../../assets/Home/jumia.png')},
    {username: 'Hala', img: require('../../assets/Home/amazon.png')},
    {username: 'nothala', img: require('../../assets/Home/amazon.png')},
  ];
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  function renderUserHistory(itemData) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'white',
          borderWidth: 0,
          borderBottomWidth: 1,
          marginTop: 12,
        }}>
        <Image source={itemData.item.img} style={{marginBottom: 10}}></Image>
        <View style={{marginStart: 10}}>
          <Text style={styles.historytitle}>{itemData.item.username}</Text>
          <Text style={styles.historydate}>15-12-2021</Text>
        </View>
        <Text style={styles.historyprice}>$250.21</Text>
      </View>
    );
  }
  return (
    <>
      <View
        style={{
          flexDirection: en ? 'row' : 'row-reverse',
          alignItems: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.sendmoney]}>{strings.history}</Text>
        <Text style={styles.viewall}>{strings.viewalltransactions}</Text>
      </View>
      <ScrollView horizontal={true} contentContainerStyle={{flex: 1}}>
        <FlatList
          data={history}
          renderItem={renderUserHistory}
          keyExtractor={item => item.username}
        />
      </ScrollView>
    </>
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
    sendmoney: {
      color: props.colors.text,
      fontSize: 20,
      fontWeight: '700',
    },
    viewall: {
      color: '#808080',
      fontSize: 14,
      fontWeight: '400',
    },
    historytitle: {
      fontSize: 18,
      color: props.colors.text,
    },
    historydate: {
      color: '#B7B7B7',
      fontSize: 14,
      marginBottom: 10,
    },
    historyprice: {
      color: props.colors.text,
      fontWeight: '700',
      fontSize: 18,
      marginStart: 'auto',
      marginBottom: 10,
    },
  });

export default History;
