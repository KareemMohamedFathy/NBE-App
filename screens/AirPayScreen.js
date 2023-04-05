import {useIsFocused, useTheme} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {DraxProvider, DraxScrollView, DraxView} from 'react-native-drax';
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
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';
import History from '../components/Home/History';
import HomeBanner from '../components/Home/HomeBanner';
import HomeModal from '../components/HomeModal';
import strings from '../components/Language/AuthNames';
import AirPayWorkedModal from '../components/AirPayWorkedModal';
import Button from '../components/ui/Button';
import ButtonWithImg from '../components/ui/ButtonWithImg';
import MyDarkTheme from '../mythemes/MyDarkTheme';
import MyDefaultTheme from '../mythemes/MyDefaultTheme';
import AirPayFailed from '../components/AirPayFailed';
import {SheetManager} from 'react-native-actions-sheet';

function AirPayScreen({navigation}) {
  const isFocused = useIsFocused();
  const styles = useGlobalStyles();
  const localThemes = useTheme();
  const allcards = [
    require('../assets/Home/redcarddark.png'),

    require('../assets/Home/bluecarddark.png'),
    require('../assets/Home/greencarddark.png'),
  ];
  const [choosenCard, setChoosenCard] = useState('x');

  const [isCard, setisCard] = useState(false);
  const [visible, setVisible] = useState(false);

  const [airpayVisible, setAirPayVisible] = useState(false);
  const [airpayFailedVisible, setAirPayFailedVisible] = useState(false);

  function isVisible() {
    setVisible(!visible);
    setAirPayFailedVisible(true);
  }
  function tryAgain() {
    // setVisible(!visible);
    SheetManager.show('FingerPrintHomeModal', {
      payload: {value: getFingerPrint, tryagain: isAirPayFailedVisible},
    });
    setAirPayFailedVisible(false);
  }
  function isAirPayVisible() {
    setAirPayVisible(!airpayVisible);
  }
  function isAirPayFailedVisible() {
    setAirPayFailedVisible(!airpayFailedVisible);
  }

  function setModal() {
    SheetManager.show('FingerPrintHomeModal', {
      payload: {value: getFingerPrint, tryagain: isAirPayFailedVisible},
    });
  }
  function setAirPayModal() {
    setAirPayVisible(true);
  }
  function getFingerPrint() {
    //  setVisible(!visible);
    setAirPayModal();
  }
  function chooseCard(img) {
    setChoosenCard(img);
    setisCard('true');
  }
  useEffect(() => {
    navigation.setOptions({
      tabBarLabelStyle: {
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 11,
      },
    });
  }, [isCard]);
  return (
    <DraxProvider>
      <View style={[styles.container]}>
        <View
          style={{
            backgroundColor: 'rgba(28, 36, 55, 0.77)',
          }}></View>
        <HomeBanner />

        <DraxScrollView
          showsHorizontalScrollIndicator={true}
          overScrollMode={'always'}
          horizontal={true}>
          <DraxView
            style={{marginVertical: 30, marginHorizontal: 20}}
            onDragStart={() => {}}
            payload="0">
            <Pressable
              onPress={() =>
                chooseCard(require('../assets/Home/redcarddark.png'))
              }>
              <Image source={require('../assets/Home/redcarddark.png')}></Image>
            </Pressable>
          </DraxView>

          <DraxView
            onDragStart={() => {}}
            style={{marginVertical: 30, marginHorizontal: 20}}
            payload="1">
            <Pressable
              onPress={() =>
                chooseCard(require('../assets/Home/bluecarddark.png'))
              }>
              <Image
                style={{marginEnd: 16}}
                source={require('../assets/Home/bluecarddark.png')}></Image>
            </Pressable>
          </DraxView>

          <DraxView
            onDragStart={() => {}}
            payload="2"
            style={{marginVertical: 30, marginHorizontal: 20}}>
            <Pressable
              onPress={() =>
                chooseCard(require('../assets/Home/greencarddark.png'))
              }>
              <Image
                style={{marginEnd: 16}}
                source={require('../assets/Home/greencarddark.png')}></Image>
            </Pressable>
          </DraxView>
        </DraxScrollView>
        <View style={{flex: 5, marginBottom: 30}}>
          <View
            style={{
              borderRadius: 27,
              borderStyle: 'dashed',
              borderColor: '#007236',
              flex: 1,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!isCard && (
              <DraxView
                style={{height: 200}}
                onReceiveDragEnter={({dragged: {payload}}) => {}}
                onReceiveDragExit={({dragged: {payload}}) => {}}
                onReceiveDragDrop={({dragged: {payload}}) => {
                  setChoosenCard(allcards[payload]);

                  setisCard(true);
                }}>
                <Text style={styles.hold}>{strings.dragcard}</Text>
              </DraxView>
            )}
            {isCard && (
              <DraxView
                onReceiveDragEnter={({dragged: {payload}}) => {}}
                onReceiveDragExit={({dragged: {payload}}) => {}}
                onReceiveDragDrop={({dragged: {payload}}) => {
                  setChoosenCard(allcards[payload]);
                }}>
                <Image source={choosenCard} style={{}} />
              </DraxView>
            )}
          </View>
        </View>

        <View>
          <ButtonWithImg
            img={require('../assets/Home/smallfingerprint.png')}
            bstyle={{marginVertical: 24}}
            textstyle={{textAlign: 'center'}}
            onPress={setModal}>
            {strings.paynow}
          </ButtonWithImg>
        </View>

        <AirPayWorkedModal
          modalon={airpayVisible}
          onPress={isAirPayVisible}
          onSecure={getFingerPrint}></AirPayWorkedModal>
        <AirPayFailed
          modalon={airpayFailedVisible}
          onPress={isAirPayFailedVisible}
          onTryAgain={tryAgain}></AirPayFailed>
      </View>
    </DraxProvider>
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
    hold: {
      fontWeight: '500',
      fontSize: 20,
      textAlign: 'center',
      marginHorizontal: 25,
    },
  });

export default AirPayScreen;
