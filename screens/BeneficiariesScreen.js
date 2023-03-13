import {useFocusEffect, useIsFocused, useTheme} from '@react-navigation/native';
import {useCallback, useMemo, useState} from 'react';
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
import {FlatList} from 'react-native-gesture-handler';
import SmallCard from '../components/ui/SmallCard';
import MediumCard from '../components/ui/MediumCard';

import {useSelector} from 'react-redux';
import {useEffect} from 'react/cjs/react.development';
import HomeBanner from '../components/Home/HomeBanner';
import strings from '../components/Language/AuthNames';
import Button from '../components/ui/Button';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import BeneficiariesGridCard from '../components/ui/BeneficiariesGridCard';
import BeneficiariesDetailedCard from '../components/ui/BeneficiariesDetailedCard';
import MissonCompleteModal from '../components/MissionCompleteModal';
import BeneficiarisOptionsModal from '../components/BeneficiarisOptionsModal';
import axios from 'axios';
import {firebase} from '@react-native-firebase/auth';

function BeneficiariesScreen({navigation, route}) {
  const [visible, setVisible] = useState(false);
  function isVisible() {
    setIndex(-1);
    setVisible(!visible);
  }
  function setModal() {
    setVisible(true);
  }

  const isFocused = useIsFocused();
  const localThemes = useTheme();
  const styles = useGlobalStyles();
  const [numCols, setColumnNo] = useState(4);
  const [history, setHistory] = useState([]);

  const [index, setIndex] = useState(-1);
  const [optionsindex, setOptionsIndex] = useState(-1);
  const [remove, setRemove] = useState(true);
  const uid = firebase.auth().currentUser?.uid;

  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const [renderMode, setRenderMode] = useState('grid');
  function changeRenderMode() {
    const mode = renderMode === 'grid' ? 'list' : 'grid';
    setRenderMode(mode);
    setColumnNo(numCols == 4 ? 1 : 4);
  }
  function gotoAddBen() {
    navigation.navigate('AddBeneficiaries');
  }
  const BACKEND_URL = 'https://react-task-c2c86-default-rtdb.firebaseio.com';

  async function getBenefeciaries() {
    const response = await axios.get(
      BACKEND_URL + `/Benefeciaries.json?orderBy="myid"&equalTo="${uid}"`,
    );
    const beneficiares = [];

    for (const key in response.data) {
      const benefeciarie = {
        benid: key,
        firstname: response.data[key].firstname,
        lastname: response.data[key].lastname,
        email: response.data[key].email,
        branch: response.data[key].branch,
        phoneno: response.data[key].phoneno,
        accountnumber: response.data[key].accountnumber,
        image: response.data[key].image,
        myid: response.data[key].myid,
      };
      beneficiares.push(benefeciarie);
    }
    return beneficiares;
  }
  function renderUserHistory(itemData) {
    let amount = parseFloat(itemData.item.amount).toFixed(2);
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
        <View style={{marginStart: 10}}>
          <Text style={styles.historytitle}>{itemData.item.title}</Text>
          <Text style={styles.historydate}>{itemData.item.date}</Text>
        </View>
        <Text style={styles.historyprice}>{amount + '$'}</Text>
      </View>
    );
  }
  function deleteBen(id) {
    setIndex(-1);
    setRemove(!remove);
    isVisible();
    setOptionsIndex(-1);
    axios.delete(`${BACKEND_URL}/Benefeciaries/${id}.json`);
  }
  function renderUsersItem(itemData) {
    return (
      <BeneficiariesGridCard
        bstyle={{
          backgroundColor: '#F8F9FC',
        }}
        itemData={itemData}
        imagepath={itemData.item.img}
        username={itemData.item.firstname}
        onPress={transactionHistory}></BeneficiariesGridCard>
    );
  }
  async function transactionHistory(itemdata) {
    if (renderMode === 'grid') changeRenderMode();
    setIndex(index !== -1 ? -1 : itemdata.index);
    await getTransactions(itemdata.item.benid);
    console.log('run');
    console.log(history);
    console.log('kuso');
  }
  const [users, setUsers] = useState([]);

  function renderUsersDetailed(itemData) {
    return (
      <BeneficiariesDetailedCard
        itemdata={itemData}
        onPress={transactionHistory}
        onOptions={() => onOptions(itemData.index)}
      />
    );
  }
  function onOptions(id) {
    setOptionsIndex(id);
    setModal(true);
  }
  async function getTransactions(benid) {
    console.log(benid + 'Hi');

    const response = await axios.get(
      BACKEND_URL + `/Transfer.json?orderBy="sender"&equalTo="${uid}"`,
    );

    const history = [];
    for (const key in response.data) {
      benkey = response.data[key].reciever;
      if (benkey === benid) {
        const transfer = {
          benid: key,
          amount: response.data[key].amount,
          date: response.data[key].date,
          title: response.data[key].title,
        };
        history.push(transfer);
      }
    }
    console.log(history);
    console.log('why no history');
    setHistory(history);
  }

  useEffect(() => {
    async function fetchBenefeciaries() {
      setUsers(await getBenefeciaries());
    }
    fetchBenefeciaries();

    navigation.getParent().setOptions({
      tabBarLabelStyle: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 11,
      },
    });
  }, [route, remove]);
  return (
    <View style={styles.container}>
      <HomeBanner />
      {index === -1 && (
        <View
          style={[
            styles.bentitle,
            {flexDirection: en ? 'row' : 'row-reverse'},
          ]}>
          <Text style={[styles.beneficiaries]}>{strings.beneficiaries}</Text>
          <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
            <Pressable onPress={changeRenderMode}>
              <Image
                source={
                  renderMode === 'grid'
                    ? require('../assets/Benf/grid.png')
                    : require('../assets/Benf/list.png')
                }
              />
            </Pressable>
            <Pressable onPress={gotoAddBen}>
              <Image
                source={
                  en
                    ? require('../assets/Benf/Add.png')
                    : require('../assets/Benf/addar.png')
                }
                style={{marginStart: en ? 10 : 0, marginEnd: en ? 0 : 10}}
              />
            </Pressable>
          </View>
        </View>
      )}

      {users.length == 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/Benf/noben.png')}
            style={{marginStart: 10}}
          />
          <Text style={styles.nobenheader}>{strings.nobeneficiaries}</Text>
          <Text style={styles.nobencontent}>{strings.nobeneficiariesadd}</Text>
          <Pressable onPress={gotoAddBen}>
            <Image
              source={
                en
                  ? require('../assets/Benf/Add.png')
                  : require('../assets/Benf/addar.png')
              }
              style={{marginStart: en ? 10 : 0, marginEnd: en ? 0 : 10}}
            />
          </Pressable>
        </View>
      )}

      <View
        style={{
          flex: users.length < 1 ? 1 : index == -1 ? 10 : 1,
          marginTop: 15,
        }}>
        <FlatList
          data={index == -1 ? users : [users[index]]}
          renderItem={
            renderMode === 'grid' ? renderUsersItem : renderUsersDetailed
          }
          key={numCols}
          keyExtractor={item => item.benid}
          horizontal={false}
          numColumns={numCols}
        />
      </View>
      {index !== -1 && (
        <View style={{flex: 2}}>
          <Text style={styles.beneficiaries}>
            {strings.transactionshistory}
          </Text>
          {history.length == 0 && (
            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/Benf/transactions.png')}
                style={{marginStart: 10}}
              />
              <Text style={styles.nobenheader}>{strings.no}</Text>
              <Text style={styles.nobencontent}>{strings.notransactions}</Text>
            </View>
          )}
          <FlatList
            data={history}
            renderItem={renderUserHistory}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      <BeneficiarisOptionsModal
        modalon={visible}
        benid={
          index !== -1
            ? users[index].id
            : optionsindex === -1
            ? 'no reciever'
            : users[optionsindex].id
        }
        onPress={isVisible}
        index={index}
        bendata={
          index !== -1
            ? users[index]
            : optionsindex === -1
            ? 'no reciever'
            : users[optionsindex]
        }
        onDelete={deleteBen}></BeneficiarisOptionsModal>
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
      flex: 1,
      backgroundColor: props.colors.background,
      paddingTop: 55,
      paddingHorizontal: 25,
    },
    beneficiaries: {
      fontWeight: '700',
      fontSize: 20,
      color: props.colors.text,
    },
    bentitle: {
      justifyContent: 'space-between',
      marginTop: 30,
      flex: 1,
    },
    nobenheader: {
      color: props.colors.text,
      fontWeight: '500',
      fontSize: 18,
      textAlign: 'center',
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

    nobencontent: {
      color: '#464665',
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 35,
    },
  });
export default BeneficiariesScreen;
