import { React, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Home from '../../assets/pool_1.jpg'
import DropDown from './DropDown';
import CityDropDown from './CityDropDown';
import { useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';




const PropertySearch = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={Home}
        style={styles.backgroundImage}
      > */}
      <View style={styles.searchBarContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          multiple={true}
          min={0}
          max={5}
        />
        {/* <Searchbar style={styles.searchBar} placeholder="Search for a property" /> */}
      </View>
      <View style={styles.dropDowns}>
        <DropDown />
        <CityDropDown />
      </View>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Search
      </Button>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    // flex: 1,
    marginTop: 5,
    height: 190,
    rowGap: 10,
    backgroundColor: '#f5f5f0',
  },
  dropDowns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backgroundImage: {
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 200
  },
  searchBarContainer: {
    height: 40, // set the height to 4 (40/10 = 4)
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  searchBar: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 0,
    textAlign: 'center', // center the text horizontally
    textAlignVertical: 'center', // center the text vertically

  },
});

export default PropertySearch;
