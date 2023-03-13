import {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import {GlobalStyles} from '../../constants/styles';

function CustomDropDown({children, onPress, bstyle, textstyle, img, label}) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const currentL = useSelector(state => state.counter.value);

  const en = currentL === 'en';

  const handleInputFocus = textinput => {
    setIsInputFocused(true);
  };
  const handleInputBlur = textinput => {
    setIsInputFocused(false);
  };

  return (
    <View style={{backgroundColor: 'white', marginTop: 16, borderRadius: 15}}>
      <Text
        style={
          isInputFocused
            ? [styles.label, {color: '#007236'}]
            : [styles.label, {color: 'black'}]
        }>
        {label}
      </Text>

      <SelectDropdown
        defaultButtonText={en ? 'Choose type of transfer' : 'اختار فرع البنك'}
        data={[
          en ? '043 - Water Way Mall' : ' 043 - فرع واتر واي مول ',
          en ? '045 - City Stars Mall' : ' 045 - فرع سيتي ستارز ',
        ]}
        onSelect={(selectedItem, index) => {}}
        renderDropdownIcon={() => {
          return <Image source={require('../../assets/Benf/down.png')} />;
        }}
        dropdownIconPosition={en ? 'right' : 'left'}
        buttonStyle={{
          width: '100%',
          backgroundColor: 'white',
          alignItems: en ? 'flex-end' : 'flex-start',
          flexDirection: 'column',
        }}
        buttonTextStyle={{
          fontSize: 16,
          alignSelf: en ? 'flex-start' : 'flex-end',
        }}
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    marginTop: 11,
    marginStart: 16,
    marginEnd: 16,
  },
});

export default CustomDropDown;
