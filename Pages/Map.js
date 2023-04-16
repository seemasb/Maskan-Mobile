import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { FAB, Portal } from 'react-native-paper';
import MarkerIcon from '../assets/marker.png';

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
  const mapRef = useRef(null);



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

  return (
    <View style={{ flex: 1}}>
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
          if(drawingMode){
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
          />
        ))}

      </MapView>
      {/* <Portal>
        <FAB.Group
          open={open}
          style={styles.FAB}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'map',
              label: 'Toggle map type',
              onPress: handleMapTypeToggle,
            },
            {
              icon: 'pencil',
              label: 'Toggle drawing mode',
              onPress: handleDrawingModeToggle,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal> */}
      <View style={styles.mapFAB}>
        <FAB
          icon="map"
          style={mapType=='standard' ? styles.fab : styles.fabSelected}
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
      {/* <View style={{ position: 'absolute', bottom: 20, right: 20 , zIndex: 100 }}>
      <Portal>
        <FAB.Group
          open={false}
          visible
          icon={drawingMode ? 'close' : 'shape-outline'}
          actions={[
            {
              icon: 'map',
              label: 'Toggle map type',
              onPress: handleMapTypeToggle,
            },
            {
              icon: 'pencil',
              label: 'Toggle drawing mode',
              onPress: handleDrawingModeToggle,
            },
          ]}
          onStateChange={({ open }) => console.log('isOpen', open)}
          color="#45729d"
          style={{ backgroundColor: '#fff' }}
        />
        </Portal>
      </View> */}

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
  fabSelected:{
    backgroundColor: '#bfbfbf',
    borderRadius: 50,
  }
});
