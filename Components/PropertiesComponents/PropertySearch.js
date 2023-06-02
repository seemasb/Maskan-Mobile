import { React, useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Home from '../../assets/pool_1.jpg'
import DropDown from './DropDown';
import CityDropDown from './CityDropDown';
import { useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { Modal, Portal, Text, Provider } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ROOT_URL from '../ProfileComponents/config';



const PropertySearch = ({ setCradSearchResponse }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Garage', value: 'garage', icon: () => <FontAwesome5 name="car-alt" size={20} color="#45729d" /> },
    { label: 'Garden', value: 'garden', icon: () => <Entypo name="tree" size={20} color="#45729d" /> },
    { label: 'Gym', value: 'gym', icon: () => <MaterialCommunityIcons name="dumbbell" size={20} color="#45729d" /> },
    { label: 'Accessible', value: 'accessible', icon: () => <FontAwesome5 name="accessible-icon" size={20} color="#45729d" />},
    { label: 'Elevator', value: 'elevator', icon: () => <MaterialIcons name="elevator" size={20} color="#45729d" /> },
    { label: 'Furnished', value: 'furnished', icon: () => <MaterialCommunityIcons name="sofa-single" size={20} color="#45729d" /> },
    { label: 'Swimming Pool', value: 'swimming pool', icon: () => <MaterialIcons name="pool" size={20} color="#45729d" /> }

  ]);

  DropDownPicker.setMode("BADGE");

  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [sliderValue, setSliderValue] = useState(null);
  const [CityValue, setCityValue] = useState(null);
  const [StatusValue, setStatusValue] = useState(null);
  const [AreasliderValue, setAreaSliderValue] = useState(null);
  const [type, setType] = useState("");

  const onSliderValueChange = (value) => {
    setSliderValue(value);
  };

  const onAreaSliderValueChange = (value) => {
    setAreaSliderValue(value);
  };

  const [visible, setVisible] = useState(false);

  const togglefilteration = () => setVisible(!visible);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'red', padding: 20, zIndex: 100 };

  useEffect(() => {
    handleSearchProperties();
  }, [])


  const handleSearchProperties = () => {
    // console.log(value)
    setVisible(false)
    let featuresFinalVersion = '';
    value.map((feature, index) => {

      // console.log(feature)
      featuresFinalVersion = featuresFinalVersion + feature
      // console.log(featuresFinalVersion)
      if (index != value.length - 1)
        featuresFinalVersion = featuresFinalVersion + ','

      // else featuresFinalVersion = featuresFinalVersion + feature
    })

    // console.log(featuresFinalVersion)

    const FilterationReq = {
      city: CityValue,
      state: StatusValue,
      type: type,
      min_area: '',
      max_area: AreasliderValue,
      min_price: '',
      max_price: sliderValue,
      features: featuresFinalVersion,
      bedrooms: bedrooms,
      bathrooms: bathrooms
    }

    console.log(FilterationReq)

    const Search = async () => {
      try {
        setCradSearchResponse(null);
        const response = await axios.get(`${ROOT_URL}/properties/houses/api/`, {
          params: {
            city: CityValue,
            state: StatusValue,
            type: type,
            // min_area: '',
            max_area: AreasliderValue,
            // min_price: '',
            max_price: sliderValue,
            features: featuresFinalVersion,
            bedrooms: bedrooms,
            bathrooms: bathrooms

          }
        });

        console.log(response.status)
        if (response.status === 200) {
          setCradSearchResponse(response.data);
        }

      } catch (error) {
        console.error(error);
      }
    }
    Search();
  }

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
          max={8}
          placeholder="Search by Features"
          badgeDotColors={["#45729d"]}
          badgeColors={['white']}
          badgeStyle={{ borderWidth: 1, borderColor: '#45729d' }}
          zIndex={1000}
          autoScroll ={true}
          dropDownMaxHeight={800}

        />
      </View>
      <View style={styles.dropDowns}>
        <DropDown StatusValue={StatusValue} setStatusValue={setStatusValue} />
        <CityDropDown setCityValue={setCityValue} CityValue={CityValue} />
      </View>
      {visible ?
        <View style={{ rowGap: 20 }}>
          <View style={styles.radioButtonGroup}>
            <Ionicons name="bed-outline" size={28} color="black" />
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.radioButtonItem,
                  bedrooms === value && { backgroundColor: '#45729d', borderColor: '#45729d' },
                ]}
                onPress={() => setBedrooms(value)}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    bedrooms === value && { color: 'white' },
                  ]}
                >
                  {value == 5 ? '+' + value : value}
                </Text>
              </TouchableOpacity>
            ))}

          </View>

          <View style={styles.radioButtonGroup}>
            <MaterialCommunityIcons name="bathtub-outline" size={28} color="black" />
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.radioButtonItem,
                  bathrooms === value && { backgroundColor: '#45729d', borderColor: '#45729d' },
                ]}
                onPress={() => setBathrooms(value)}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    bathrooms === value && { color: 'white' },
                  ]}
                >
                  {value == 5 ? '+' + value : value}
                </Text>
              </TouchableOpacity>
            ))}

          </View>


          <View>
            <Text style={{ color: 'gray' }}>{`Price Max: ${sliderValue}`}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Feather name="dollar-sign" size={24} color="black" />
              <Slider
                style={{ width: '90%', height: 40 }}
                minimumValue={50000}
                maximumValue={1000000}
                minimumTrackTintColor="#45729d"
                maximumTrackTintColor="gray"
                step={1}
                value={sliderValue}
                onValueChange={onSliderValueChange}
              />
            </View>

          </View>
          <View>

            <Text style={{ color: 'gray' }}>{`Area Max: ${AreasliderValue}`}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

              <MaterialCommunityIcons name="ruler-square-compass" size={24} color="black" />
              <Slider
                style={{ width: '90%', height: 40 }}
                minimumValue={300}
                maximumValue={10000}
                minimumTrackTintColor="#45729d"
                maximumTrackTintColor="gray"
                step={1}
                value={AreasliderValue}
                onValueChange={onAreaSliderValueChange}
              />
            </View>
          </View>
        </View>
        :
        <></>
      }

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 7 }}>
        <Button
          mode="contained"
          style={{ backgroundColor: '#45729d', width: '85%' }}
          labelStyle={{ fontSize: 15 }}
          onPress={handleSearchProperties}
        >
          Search
        </Button>
        {/* <IconButton
          icon="tune"
          size={22}
          mode='outlined'
          iconColor='white'
          style={{backgroundColor: '#45729d'  , borderColor: '#45729d'}}
          onPress={() => console.log('Pressed')}
        /> */}
        <FAB
          icon="tune"
          size='small'
          // customSize={40}
          color='white'
          mode='flat'
          style={{ backgroundColor: '#45729d' }}
          onPress={togglefilteration}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 0,
    // marginTop: 5,
    // height: 190,
    rowGap: 10,
    backgroundColor: '#f2f2f2',
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
  radioButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    padding: 5,
    paddingHorizontal: 17,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'lightgray',

  },
  radioButtonText: {
    color: 'gray'
  }
});

export default PropertySearch;
