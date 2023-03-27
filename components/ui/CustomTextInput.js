import {useTheme} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../constants/styles';
import MyDarkTheme from '../../mythemes/MyDarkTheme';
import MyDefaultTheme from '../../mythemes/MyDefaultTheme';
import strings from '../Language/AuthNames';

function CustomTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) {
  const currentL = useSelector(state => state.counter.value);
  const en = currentL === 'en';
  const localThemes = useTheme();
  const styles = useGlobalStyles();
  const [isInputFocused, setIsInputFocused] = useState({
    label: false,
  });
  const handleInputFocus = textinput => {
    setIsInputFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsInputFocused({
      [textinput]: false,
    });
  };
  return (
    <View
      style={[
        !isInputFocused[label]
          ? styles.password
          : [
              styles.password,
              {
                borderRadius: 10,
                borderStyle: 'solid',
                borderWidth: 1.5,
                borderColor: '#007236',
              },
            ],
        {
          flexDirection: 'column',
        },
      ]}>
      <Text
        style={
          isInputFocused[label]
            ? [styles.label, {color: '#007236'}]
            : [styles.label, {color: 'black'}]
        }>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={localThemes.colors.primary}
        onFocus={() => handleInputFocus(label)}
        onBlur={() => handleInputBlur(label)}
        keyboardType={keyboardType ? keyboardType : 'default'}
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
    label: {
      fontWeight: '700',

      fontSize: 16,
      color: 'black',
      marginHorizontal: 23,
      marginTop: 11,
    },

    labelfocused: {
      fontSize: 16,
      color: '#007236',
      fontWeight: '700',

      marginHorizontal: 23,
      marginTop: 11,
    },
    password: {
      marginTop: 20,
      padding: 0,
      backgroundColor: props.colors.backgroundColor,
      flexDirection: 'row',
      borderRadius: 10,
      marginStart: 8,
      flex: 1,
      backgroundColor: props.colors.card,
    },

    input: {
      fontSize: 16,
      fontWeight: '400',
      color: 'black',
      marginStart: 20,
    },
  });

export default CustomTextInput;
