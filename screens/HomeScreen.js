import {
  useTheme,
  DarkTheme,
  DefaultTheme,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../mythemes/MyDarkTheme';
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
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import VerifyText from '../components/ui/VerifyText';
import SmallCard from '../components/ui/SmallCard';
import MediumCard from '../components/ui/MediumCard';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import HomeModal from '../components/HomeModal';
import HomeBanner from '../components/Home/HomeBanner';
import History from '../components/Home/History';
import {useSelector} from 'react-redux';
import strings from '../components/Language/AuthNames';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import axios from 'axios';
import {get} from 'immer/dist/internal';
import {SheetManager} from 'react-native-actions-sheet';

function HomeScreen({navigation, route}) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';

  const [users, setUsers] = useState([]);
  const BACKEND_URL = 'https://react-task-c2c86-default-rtdb.firebaseio.com';
  const uid = firebase.auth().currentUser?.uid;
  useEffect(() => {
    getBenefeciaries();
  }, []);
  function getBenefeciaries() {
    database()
      .ref('Benefeciaries')
      .orderByChild('myid')
      .equalTo('' + uid)
      .on('value', snapshot => {
        const benf = [];
        if (snapshot.exists) {
          snapshot.forEach(response => {
            const z = response.val();
            z.benid = response.key;
            benf.push(z);
          });
        }

        setUsers(benf);
      });

    // const response = await axios.get(
    //   BACKEND_URL + `/Benefeciaries.json?orderBy="myid"&equalTo="${uid}"`,
    // );
  }

  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [mybalance, setMybalance] = useState('Press here to show balance');
  const [fingerprintV, setFingerPrintV] = useState(false);
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  function goToCardsScreen() {
    navigation.navigate(strings.cards);
  }
  function setModal() {
    SheetManager.show('FingerPrintHomeModal', {
      payload: {value: getFingerPrint},
    });
  }
  function getFingerPrint() {
    setMybalance('$2,374,654.25');
    setFingerPrintV(true);
    setVisible(!visible);
  }
  useLayoutEffect(() => {
    const parent = navigation.getParent('test');
    parent.getParent().setOptions({
      tabBarLabelStyle: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 11,
      },
    });
  });
  function gotoTransfer(id, phoneno, devicetoken) {
    navigation.navigate('Transfer', {
      benid: id,
      phoneno: phoneno,
      devicetoken: devicetoken,
    });
  }

  function renderUsersItem(itemData) {
    return (
      <MediumCard
        bstyle={{
          backgroundColor: '#F8F9FC',
        }}
        imagepath={itemData.item.image}
        benid={itemData.item.benid}
        itemData={itemData.item}
        onPress={gotoTransfer}>
        {itemData.item.firstname}
      </MediumCard>
    );
  }
  return (
    <ScrollView horizontal={false}>
      <View style={styles.container}>
        <HomeBanner />
        <Pressable onPress={setModal}>
          <View style={styles.balance}>
            <ImageBackground
              source={require('../assets/Home/test.png')}
              style={{paddingBottom: 40}}>
              <View
                style={[
                  styles.balanceheader,
                  {flexDirection: en ? 'row' : 'row-reverse'},
                ]}>
                <Text style={{color: 'white'}}>{strings.balance}</Text>
                <Image
                  source={require('../assets/Home/smallfingerprint.png')}
                  style={{marginStart: 'auto'}}></Image>
              </View>
              <View style={styles.showbalance}>
                <Text style={styles.showbalancetext}>
                  {fingerprintV ? mybalance : strings.showbalance}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>
        <View
          style={[
            styles.manageacoount,
            {flexDirection: en ? 'row' : 'row-reverse'},
          ]}>
          <SmallCard
            bstyle={{
              backgroundColor: '#00C97426',
              borderRadius: 12,
              marginTop: 25,
            }}
            imagepath={require('../assets/Home/accounts.png')}
            outertext={strings.accounts}></SmallCard>
          <SmallCard
            onPress={goToCardsScreen}
            bstyle={{
              backgroundColor: '#00ADF826',
              borderRadius: 12,
              marginTop: 25,
            }}
            imagepath={require('../assets/Home/cards.png')}
            outertext={strings.cards}></SmallCard>

          <SmallCard
            bstyle={{
              backgroundColor: '#F6A72126',
              borderRadius: 12,
              marginTop: 25,
            }}
            imagepath={require('../assets/Home/utilities.png')}
            outertext={strings.utilities}></SmallCard>

          <SmallCard
            bstyle={{
              backgroundColor: '#FF002E26',
              borderRadius: 12,
              marginTop: 25,
            }}
            imagepath={require('../assets/Home/history.png')}
            outertext={strings.history}></SmallCard>
        </View>
        <View
          style={{
            flexDirection: en ? 'row' : 'row-reverse',

            alignItems: 'center',
            marginTop: 25,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.sendmoney}>{strings.sendmoney}</Text>
          <Text style={styles.viewall}>{strings.viewallusers}</Text>
        </View>
        <View style={{}}>
          <ScrollView horizontal={false}>
            <FlatList
              data={users}
              renderItem={renderUsersItem}
              keyExtractor={item => item.benid}
              horizontal={true}
              inverted={en ? false : true}
              style={{}}
            />
          </ScrollView>
        </View>
        <History />
        <View></View>
      </View>
    </ScrollView>
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
    balance: {
      backgroundColor:
        props.colors.background == '#1F2933' ? '#007236' : '#003D1D',
      borderRadius: 22,
      borderColor: 'white',
      marginTop: 18,
      overflow: 'hidden',
    },
    balanceheader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 13,
    },
    balancetext: {
      fontSize: 16,
      color: '#F7F7F7',
    },
    showbalance: {
      paddingHorizontal: 24,
    },
    showbalancetext: {
      fontSize: 22,
      fontWeight: '700',
      color: '#F7F7F7',
      textAlign: 'center',
    },
    manageacoount: {
      flexDirection: 'row',
    },
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
  });
export default HomeScreen;
