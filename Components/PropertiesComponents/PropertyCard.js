import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../assets/pool_1.jpg'
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const PropertyCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={Home} />
      <Card.Content style={styles.content}>
        <Paragraph style={styles.location}>
          <Icon name="map-marker" size={16} color="#9e9e9e" /> San Francisco, CA
        </Paragraph>
        <Title style={styles.price}>$500,000</Title>
        <View style={styles.features}>
          <View style={{flexDirection: 'row' , alignItems: 'center'}}>
            <View style={styles.icon}>
              <Icon name="bed" size={24} color="#45729d" />
            </View>
            <Text style={styles.featureCount}>3 Bedrooms</Text>
          </View>
          <View style={{flexDirection: 'row' , alignItems: 'center'}}>
            <View style={styles.icon}>
              <FontAwesome5 name="bath" size={20} color="#45729d" />
            </View>
            <Text style={styles.featureCount}>2 Bathrooms</Text>
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