import { View, StyleSheet, Text, ScrollView } from "react-native";
import Gallary from "../Components/PropertyDetailsComponents/Gallary";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Divider } from "react-native-paper";
import { Button, Dialog, Portal } from "react-native-paper";
import { useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import MarkerIcon from '../assets/marker.png'
import Map from "./Map";


function PropertyDetails() {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const [markers, setMarkers] = useState([
        { id: 1, title: 'Marker 1', latitude: 37.78825, longitude: -122.4324 },
        { id: 2, title: 'Marker 2', latitude: 37.79925, longitude: -122.4324 },
        { id: 3, title: 'Marker 3', latitude: 37.78825, longitude: -122.4224 },
    ]);


    return (
        <View style={styles.container}>
            <ScrollView >
                <Gallary />

                <View style={styles.detailsContainer} >
                    <View>
                        <Text style={styles.price}>$500,000</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                            <View style={styles.location}>
                                <Icon name="map-marker" size={17} color="#9e9e9e" />
                                <Text style={{ color: '#9e9e9e' }}>San Francisco</Text>
                            </View>
                            <View style={styles.features}>
                                <View style={styles.iconBox}>
                                    <View style={styles.icon}>
                                        <Icon name="bed" size={19} color="#cccccc" />
                                    </View>
                                    <Text style={styles.featureCount}>3</Text>
                                </View>
                                <View style={styles.iconBox}>
                                    <View style={styles.icon}>
                                        <FontAwesome5 name="bath" size={15} color="#cccccc" />
                                    </View>
                                    <Text style={styles.featureCount}>2</Text>
                                </View>
                                <View style={styles.iconBox}>
                                    <View style={styles.icon}>
                                        <FontAwesome5 name="vector-square" size={15} color="#cccccc" />
                                    </View>
                                    <Text style={styles.featureCount}>180</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* <Divider style={{ marginTop: 10, marginBottom: 20 }} /> */}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Desription</Text>
                        <Text style={{ color: '#8c8c8c', lineHeight: 20, letterSpacing: 1 }}>The primary bedroom suite is a true retreat with a spa-like bathroom that includes a soaking tub,
                            walk-in shower, and dual vanities. There are three additional
                            bedrooms, each with its own unique charm and character, along with
                            a bonus room that can be used as an office or playroom.
                        </Text>
                    </View>
                    {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Desription</Text>
                        <Text style={{ color: '#8c8c8c', lineHeight: 20, letterSpacing: 1 }}>The primary bedroom suite is a true retreat with a spa-like bathroom that includes a soaking tub,
                            walk-in shower, and dual vanities. There are three additional
                            bedrooms, each with its own unique charm and character, along with
                            a bonus room that can be used as an office or playroom.
                        </Text>
                    </View> */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <View style={{flex:1 , height: 200 , width: '100%' , borderRadius: 13}}>
                            <MapView
                                style={[{ flex: 1 }, styles.map]}
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

                        {/* <Map/> */}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Desription</Text>
                        <Text style={{ color: '#8c8c8c', lineHeight: 20, letterSpacing: 1 }}>The primary bedroom suite is a true retreat with a spa-like bathroom that includes a soaking tub,
                            walk-in shower, and dual vanities. There are three additional
                            bedrooms, each with its own unique charm and character, along with
                            a bonus room that can be used as an office or playroom.
                        </Text>
                    </View>
                    {/* <Divider style={{ marginTop: 10, marginBottom: 10 }} /> */}

                </View>
            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    opacity: 0.8,
                    padding: 22,
                    paddingTop: 27
                }}
            >
                <Button mode="contained" onPress={showDialog} style={{borderRadius: 13}}>
                    Schedule tour
                </Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Schedule Tour</Dialog.Title>
                        <Dialog.Content>
                            {/* Content for the dialog */}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>

        </View>
    );
}

export default PropertyDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 15,
    },
    detailsContainer: {
        padding: 16,
    },
    price: {
        fontSize: 26,
        fontWeight: 'bold',
        // marginBottom: 8,
    },
    location: {
        // color: '#9e9e9e',
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 8,

    },
    features: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 12,
        columnGap: 17,
    },
    featureCount: {
        fontSize: 15,
        color: '#cccccc',
        marginLeft: 7
    },
    icon: {
        // backgroundColor: '#fafafa',
        flexDirection: 'row',
        // padding: 7,
        // borderRadius: 100,
    },
    iconBox: {
        backgroundColor: '#fafafa',
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,

    },
    section: {
        marginTop: 17,
        marginBottom: 17,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 13 , 
    },
})