import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

const data = [
  { label: 'ALL', value: '' },
  { label: 'New York', value: 'New York' },
  { label: 'Los Angeles', value: 'Los Angeles' },
  { label: 'Houston', value: 'Houston' },
  { label: 'Philadelphia', value: 'Philadelphia' },
  { label: 'Phoenix', value: 'Phoenix' },
  { label: 'San Antonio', value: 'San Antonio' }
];

const CityDropDown = ({ setCityValue, CityValue }) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (CityValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Property Type
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#45729d' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'City' : '...'}
        // searchPlaceholder="Search..."
        value={CityValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCityValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Ionicons name="location-outline" size={20} style={styles.icon}
            color={isFocus ? 'blue' : 'black'} />

        )}
      />
    </View>
  );
};

export default CityDropDown;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 165,
    backgroundColor: 'white'
  },
  icon: {
    marginRight: 15,
  },
  label: {
    position: 'absolute',
    // backgroundColor: 'white',
    left: 22,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
