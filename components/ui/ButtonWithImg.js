import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function ButtonWithImg({children, onPress, bstyle, textstyle, img}) {
  return (
    <View style={[styles.bstyle, bstyle]}>
      <Pressable onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.textstyle, textstyle]}>{children}</Text>
          <Image source={img} style={{marginStart: 10}} />
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  bstyle: {
    backgroundColor: '#007236',
    padding: 16,
    borderRadius: 13,
  },
  textstyle: {
    marginStart: 'auto',
    marginEnd: 'auto',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ButtonWithImg;
