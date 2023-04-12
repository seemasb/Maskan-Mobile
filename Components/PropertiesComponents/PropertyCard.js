import React from 'react';
import { StyleSheet} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../assets/pool_1.jpg'

const PropertyCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={Home} />
      <Card.Content style={styles.content}>
        <Title style={styles.price}>$500,000</Title>
        <Paragraph style={styles.location}>
          <Icon name="map-marker" size={16} color="#9e9e9e" /> San Francisco, CA
        </Paragraph>
        <Paragraph style={styles.features}>
          <Icon name="bed" size={16} color="#757575" /> 3
          <Icon name="bath" size={16} color="#757575" /> 2
        </Paragraph>
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
    fontSize: 20,
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
    marginTop: 16,
    fontSize: 16
  },
  hover: {
    backgroundColor: '#45729d',
  },
});

export default PropertyCard;
