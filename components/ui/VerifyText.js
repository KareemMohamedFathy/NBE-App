import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {useTheme, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {useMemo} from 'react/cjs/react.development';
import MyDarkTheme from '../../mythemes/MyDarkTheme';
import MyDefaultTheme from '../../mythemes/MyDefaultTheme';
function VerifyText({children, onPress, bstyle, textstyle}) {
  const [mobile, onChangeMobile] = useState('');
  const styles = useGlobalStyles();
  const {dark} = useTheme();
  return (
    <View style={styles.password}>
      <TextInput
        style={styles.inputpassword}
        onChangeText={onChangeMobile}
        value={mobile}
        placeholder="_"
        placeholderTextColor={dark ? 'white' : 'black'}
        maxLength={1}
      />
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
    inputpassword: {
      fontSize: 25,
      fontWeight: '700',
      color: props.colors.text,
      textAlign: 'center',
    },
    password: {
      marginTop: 20,
      maxHeight: 'auto',
      marginEnd: 28,
      padding: 0,
      backgroundColor: props.colors.card,
      flexDirection: 'row',
      borderRadius: 10,
      margin: 0,
      m3axWidth: '15%',
      minWidth: '12%',
      justifyContent: 'center',
    },
  });

export default VerifyText;
