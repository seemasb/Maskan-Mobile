import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Title, IconButton, Provider as PaperProvider } from 'react-native-paper';
import PropertyCard from '../PropertiesComponents/PropertyCard'
import { Ionicons } from '@expo/vector-icons';
import ROOT_URL from './config';
import axios from 'axios';
const Dummy = {
  location: {
    city: 'nablus'
  },
  price: 150000,
  living_space: {
    bedrooms: 1,
    bathrooms: 2
  },
  first_image: {
    image: 'first_image'
  }
}


const PropertyList = () => {
  const [activeButton, setActiveButton] = useState('pending'); // Track the active button
  const [data, setData] = useState([]);
  const handleButtonPress = (status) => {
    setActiveButton(status);
  };

  const getEndpoint = (selectedButton) => {
    switch (selectedButton) {
      case "favorite":
        return `${ROOT_URL}/properties/favourites_home_list/`;
      case "pending":
        return `${ROOT_URL}/properties/pending_home_list/`;
      case "posted":
        return `${ROOT_URL}/properties/posted_home_list/`;
      default:
        return "";
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        let header;
        token ? header = {
          'Authorization': 'Token ' + token
        } : header = {}
        const endpoint = getEndpoint(activeButton);
        const response = await axios.get(endpoint, {headers: header});
        setData(response.data);
        // setCount(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, [activeButton])
  const renderProperties = () => {
    // Simulated property data based on the status
    const properties = {
      pending: [
        { id: 1, title: 'Pending Property 1' },
        { id: 2, title: 'Pending Property 2' },
      ],
      favorite: [
        { id: 3, title: 'Favorite Property 1' },
        { id: 4, title: 'Favorite Property 2' },
      ],
      posted: [
        { id: 5, title: 'Posted Property 1' },
        { id: 6, title: 'Posted Property 2' },
      ],
    };

    return properties[activeButton].map((property) => (
      <Text key={property.id}>{property.title}</Text>
    ));
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.buttonView, activeButton === 'pending' && styles.activebuttonView]} onPress={() => handleButtonPress('pending')}>
            <Ionicons name="time-outline" size={24} color={activeButton === 'pending' ? 'white' : 'gray'} />
            <Text style={{ color: activeButton === 'pending' ? 'white' : 'gray' }}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonView, activeButton === 'favorite' && styles.activebuttonView]} onPress={() => handleButtonPress('favorite')}>
            <Ionicons name="heart-outline" size={24} color={activeButton === 'favorite' ? 'white' : 'gray'} />
            <Text style={{ color: activeButton === 'favorite' ? 'white' : 'gray' }}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonView, activeButton === 'posted' && styles.activebuttonView]} onPress={() => handleButtonPress('posted')}>
            <Ionicons name="checkmark-circle-outline" size={24} color={activeButton === 'posted' ? 'white' : 'gray'} />
            <Text style={{ color: activeButton === 'posted' ? 'white' : 'gray' }}>Posted</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.propertiesContainer}>{renderProperties()}</View> */}
        <ScrollView>
          
          { data.map((property) => (
            <PropertyCard CardData={property} is_inProfile={true} />
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 35
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingBottom: 15

  },
  button: {
    marginHorizontal: 5,
    elevation: 2,
    color: 'white',


    // padding: 40/

  },
  buttonView: {
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 60,
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    padding: 10,
  },
  activebuttonView: {
    backgroundColor: '#45729d',
    color: 'white'
  },
  activeButton: {

    shadowColor: '#45729d',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  propertiesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PropertyList;
