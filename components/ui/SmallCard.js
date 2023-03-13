import {useTheme} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function SmallCard({
  children,
  onPress,
  bstyle,
  textstyle,
  imagepath,
  outertext,
}) {
  const {dark} = useTheme();

  return (
    <View style={styles.outercontainer}>
      <Pressable onPress={onPress}>
        <View style={[styles.bstyle, bstyle]}>
          <Image
            source={imagepath}
            style={{marginLeft: 'auto', marginRight: 'auto'}}></Image>
          {children && (
            <Text style={[styles.textstyle, textstyle]}>{children}</Text>
          )}
        </View>
        <Text
          style={[
            styles.textstyle,
            textstyle,
            {color: dark ? '#FFFFFF' : '#1C2437'},
          ]}>
          {outertext}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  outercontainer: {
    width: '18%',
    marginHorizontal: 13,
  },
  bstyle: {
    borderRadius: 13,
    height: 70,
    justifyContent: 'center',
  },
  textstyle: {
    textAlign: 'center',
    fontSize: 16,
    width: '110%',
    fontWeight: '400',
  },
});

export default SmallCard;
