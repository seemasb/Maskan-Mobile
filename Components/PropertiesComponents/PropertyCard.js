import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../assets/pool_1.jpg'
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PropertyCard = ({ CardData }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouritePress = () => {
    setIsFavourite(!isFavourite);
  };
  const imageSrc = CardData.first_image.image
  console.log(imageSrc)
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageSrc }} />

      <Card.Content style={styles.content}>
        <Paragraph style={styles.location}>
          <Icon name="map-marker" size={16} color="#9e9e9e" /> {CardData.location.city}
        </Paragraph>

        <TouchableOpacity onPress={handleFavouritePress} style={{ position: 'absolute', right: 12, top: 20 }}>
          <AntDesign name={isFavourite ? "heart" : "hearto"} size={24} color={isFavourite ? "#45739d" : "#45729d"} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
        <Title style={styles.price}>${CardData.price.toLocaleString('en-US')}</Title>
        <View style={styles.features}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.icon}>
              <Icon name="bed" size={24} color="#45729d" />
            </View>
            <Text style={styles.featureCount}>{CardData.living_space.bedrooms} Bedrooms</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.icon}>
              <FontAwesome5 name="bath" size={20} color="#45729d" />
            </View>
            <Text style={styles.featureCount}>{CardData.living_space.bathrooms} Bathrooms</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 7,
    elevation: 4,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    width: '90%'
  },
  content: {
    // paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    // marginBottom: 8,
  },
  location: {
    color: '#9e9e9e',
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
  },
  features: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    fontSize: 16
  },
  featureCount: {
    fontSize: 15,
    color: '#9e9e9e',
    marginLeft: 7
  },
  icon: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    padding: 7,
    borderRadius: 100,
  },
  hover: {
    backgroundColor: '#45729d',
  },
});

export default PropertyCard;
