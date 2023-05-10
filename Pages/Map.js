import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import { FAB, Portal } from 'react-native-paper';
import MarkerIcon from '../assets/marker.png';
import MarkerIcon2 from '../assets/home.png';
import { Image } from 'react-native';
import HomeMap from '../assets/pool_1.jpg'
import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function Map() {
  const [markers, setMarkers] = useState([
    { id: 1, title: 'Marker 1', latitude: 37.78825, longitude: -122.4324 },
    { id: 2, title: 'Marker 2', latitude: 37.79925, longitude: -122.4324 },
    { id: 3, title: 'Marker 3Overlay', latitude: 37.78825, longitude: -122.4224 },
  ]);

  const [mapType, setMapType] = useState('standard');
  const [drawingMode, setDrawingMode] = useState(false);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [zoomEnabled, setZoomEnabled] = useState(true);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const [dummyState, setDummyState] = useState(true);


  function handleMapTypeToggle() {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  }

  function handleDrawingModeToggle() {
    setDrawingMode(!drawingMode);
  }

  function handledeleteDrawing() {
    setPolygonCoords([])
  }


  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  useEffect(() => {
    if (selected !== null) {
      // do something here, like fetch data or update the UI
      setDummyState(!dummyState)
    }
  }, [selected])


  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={[{ flex: 1 }, styles.map]}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        scrollEnabled={!drawingMode}
        zoomEnabled={!drawingMode}
        // onPress={(event) => {
        //   setPolygonCoords([...polygonCoords, event.nativeEvent.coordinate]);
        // }}
        onPanDrag={(event) => {
          if (drawingMode) {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setPolygonCoords([...polygonCoords, { latitude, longitude }]);
          }
        }}
        mapType={mapType}
      >
        {/* <Polygon
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7726402, longitude: -122.4281965 },
          ]}
          fillColor="rgba(255, 0, 0, 0.5)"
          strokeColor="rgba(0, 0, 255, 0.5)"
          strokeWidth={2}
        /> */}
        {/* {polygonCoords.length > 2 && (
          <Polygon
            coordinates={polygonCoords}
            fillColor="rgba(255, 0, 0, 0.5)"
            strokeColor="rgba(0, 0, 255, 0.5)"
            strokeWidth={2}
          />
        )} */}

        <Polygon
          coordinates={polygonCoords}
          fillColor="rgba(255, 0, 0, 0.5)"
          strokeColor="rgba(255, 0, 0, 1)"
          strokeWidth={1}
        />

        {markers.map(marker => (
          <Marker
            key={marker.id}
            title={marker.title}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            image={MarkerIcon}
            onPress={() => setSelected(marker.id)}
          >
            {selected === marker.id && (
              <Callout>
                <View style={{ flexDirection: 'row', columnGap: 10, padding: 3  , alignItems: 'center'}}>
                  {/* <Text>{marker.title}</Text> */}
                  <Image source={HomeMap} style={styles.mapHomeImage}></Image>
                  <View style={{ marginTop: 5, rowGap: 5 }}>
                    <Text style={styles.Price}>$50000</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Entypo name="location-pin" size={22} color="lightgray" style={{ marginLeft: -6 }} />
                      <Text style={styles.Location}>San Fransisco</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => handleFavouritePress(marker)}>
                      <Entypo name="heart" size={20} color={marker.isFavourite ? 'red' : 'lightgray'} style={{ marginLeft: -6 }} />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </Callout>
            )}
          </Marker>
        ))}

      </MapView>

      <View style={styles.mapFAB}>
        <FAB
          icon="map"
          style={mapType == 'standard' ? styles.fab : styles.fabSelected}
          onPress={handleMapTypeToggle}
        />
        <FAB
          icon="pencil"
          style={drawingMode ? styles.fabSelected : styles.fab}
          onPress={handleDrawingModeToggle}
        />
        <FAB
          icon="delete"
          style={styles.fab}
          onPress={handledeleteDrawing}
        />
      </View>

    </View >
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
  FAB: {
    // backgroundColor: 'white',
  },
  mapFAB: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    margin: 20,
    rowGap: 15,

  },
  fab: {
    backgroundColor: '#fafafa',
    borderRadius: 50,
  },
  fabSelected: {
    backgroundColor: '#bfbfbf',
    borderRadius: 50,
  },
  mapHomeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  Price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  Location: {
    fontSize: 13,
    color: 'gray'
  }
});
