import {useIsFocused, useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
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
import MapView, {Marker} from 'react-native-maps';
import Button from '../components/ui/Button';

function AtmScreen({navigation}) {
  const isFocused = useIsFocused();
  const localThemes = useTheme();

  useEffect(() => {
    navigation.setOptions({
      tabBarLabelStyle: {
        textAlign: 'center',
        marginBottom: 8,
        // color: isFocused ? '#FFFFFF' : '#B7B7B7',
        fontSize: 11,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 30.0775851,
          longitude: 31.342583,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}>
        <Marker
          draggable
          coordinate={{
            latitude: 30.0775851,
            longitude: 31.342583,
          }}
          style={{width: 50, height: 50}}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          draggable
          coordinate={{
            latitude: 30.0375851,
            longitude: 31.342583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch 2'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>

        <Marker
          draggable
          coordinate={{
            latitude: 30.0975851,
            longitude: 31.342583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch 3'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          draggable
          coordinate={{
            latitude: 30.055851,
            longitude: 31.362583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch 4'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          draggable
          coordinate={{
            latitude: 30.0975851,
            longitude: 31.362583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch 5'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          draggable
          coordinate={{
            latitude: 30.0475851,
            longitude: 31.322583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch 6'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          draggable
          coordinate={{
            latitude: 30.055851,
            longitude: 31.322583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          draggable
          coordinate={{
            latitude: 30.0775851,
            longitude: 31.302583,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Bank Branch'}
          description={'NBE branch is located here'}>
          <Image
            source={require('../assets/marker.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    </View>
  );
}
const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
});
export default AtmScreen;
