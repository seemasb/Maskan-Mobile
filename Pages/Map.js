import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import MarkerIcon from '../assets/marker.png'

export default function Map() {

    const [markers, setMarkers] = useState([
    { id: 1, title: 'Marker 1', latitude: 37.78825, longitude: -122.4324 },
    { id: 2, title: 'Marker 2', latitude: 37.79925, longitude: -122.4324 },
    { id: 3, title: 'Marker 3', latitude: 37.78825, longitude: -122.4224 },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={[{ flex: 1 } , styles.map]}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            title={marker.title}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            image={MarkerIcon}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});