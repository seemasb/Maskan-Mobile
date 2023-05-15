import { View, StyleSheet, Text, ScrollView } from "react-native";
import Gallary from "../Components/PropertyDetailsComponents/Gallary";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Divider } from "react-native-paper";
import { Button, Dialog, Portal, Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import MarkerIcon from '../assets/marker.png'
import Map from "./Map";
import { MaterialIcons } from '@expo/vector-icons';
import ScheduleTour from "../Components/PropertyDetailsComponents/ScheduleTour";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function PropertyDetails() {
    const [visible, setVisible] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState();
    useEffect(() => {
        const getPropertyDetails = async () => {
            try {
                ROOT_URL = "http://18.198.203.6:8000";
                propertyId = 1;
                const response = await axios.get(`${ROOT_URL}/properties/home/${propertyId}/`)
                setPropertyDetails(response.data)
                console.log(response.data.features.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPropertyDetails()
    }, [])

    const showDialog = () => setVisible(true);
    const showSnackBar = () => setShowSnackbar(true);

    const hideDialog = () => setVisible(false);
    const [markers, setMarkers] = useState([
        { id: 1, title: 'Marker 1', latitude: 37.78825, longitude: -122.4324 },
        { id: 2, title: 'Marker 2', latitude: 37.79925, longitude: -122.4324 },
        { id: 3, title: 'Marker 3', latitude: 37.78825, longitude: -122.4224 },
    ]);


    return (
        <View style={styles.container}>
            {propertyDetails ? <ScrollView >
                <Gallary propertyDetails={propertyDetails} />

                <View style={styles.detailsContainer} >
                    <View>
                        <Text style={styles.price}>{propertyDetails.price}{propertyDetails.state==="S"?' $':'$ / Year'}</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 4 }}>
                            <View style={styles.location}>
                                <Icon name="map-marker" size={17} color="#9e9e9e" />
                                <Text style={{ color: '#9e9e9e' }}>{propertyDetails.location.address}, {propertyDetails.location.city}</Text>
                            </View>
                            <View style={styles.features}>
                                <View style={styles.iconBox}>
                                    <View style={styles.icon}>
                                        <Icon name="bed" size={19} color="#cccccc" />
                                    </View>
                                    <Text style={styles.featureCount}>{propertyDetails.living_space.bedrooms}</Text>
                                </View>
                                <View style={styles.iconBox}>
                                    <View style={styles.icon}>
                                        <FontAwesome5 name="bath" size={15} color="#cccccc" />
                                    </View>
                                    <Text style={styles.featureCount}>{propertyDetails.living_space.bathrooms}</Text>
                                </View>
                                <View style={styles.iconBox}>
                                    <View style={styles.icon}>
                                        <FontAwesome5 name="vector-square" size={15} color="#cccccc" />
                                    </View>
                                    <Text style={styles.featureCount}>{propertyDetails.area}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* <Divider style={{ marginTop: 10, marginBottom: 20 }} /> */}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={{ color: '#8c8c8c', lineHeight: 20, letterSpacing: 1 }}>
                            {propertyDetails.description}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Features</Text>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', columnGap: 40 }}>
                                {propertyDetails.features.data.map((item, index) => (
                                    <View key={index} style={{ alignItems: 'center' }}>
                                        <View style={styles.iconFeature}>
                                            {item.key === "garage" && <FontAwesome5 name="car-alt" size={30} color="#45729d" />}
                                            {item.key === "swimming pool" && <MaterialIcons name="pool" size={30} color="#45729d" />}
                                            {item.key === "elevator" && <MaterialIcons name="elevator" size={30} color="#45729d" />}
                                            {item.key === "accessable" && <FontAwesome5 name="accessible-icon" size={30} color="#45729d" />}
                                            {item.key === "garden" && <Entypo name="tree" size={30} color="#45729d" />}
                                            {item.key === "furnished" && <MaterialCommunityIcons name="sofa-single" size={30} color="#45729d" />}
                                            {item.key === "gym" && <MaterialCommunityIcons name="dumbbell" size={30} color="#45729d" />}
                                        </View>
                                        <Text style={styles.featureText}>{item.key}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                    </View>

                    <View style={[styles.section, styles.lastSection]}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <View style={{ flex: 1, height: 200, width: '100%', borderRadius: 13 }}>
                            <MapView
                                style={[{ flex: 1 }, styles.map]}
                                initialRegion={{
                                    latitude: propertyDetails.location.data.lat,
                                    longitude: propertyDetails.location.data.lng,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    key={propertyDetails.id}
                                    // title={marker.title}
                                    coordinate={{ latitude: propertyDetails.location.data.lat, longitude: propertyDetails.location.data.lng}}
                                    image={MarkerIcon}
                                />

                            </MapView>
                        </View>

                        {/* <Map/> */}
                    </View>

                    {/* <ScheduleTour/> */}

                    {/* <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Desription</Text>
                        <Text style={{ color: '#8c8c8c', lineHeight: 20, letterSpacing: 1 }}>The primary bedroom suite is a true retreat with a spa-like bathroom that includes a soaking tub,
                            walk-in shower, and dual vanities. There are three additional
                            bedrooms, each with its own unique charm and character, along with
                            a bonus room that can be used as an office or playroom.
                        </Text>
                    </View> */}
                    {/* <Divider style={{ marginTop: 10, marginBottom: 10 }} /> */}

                </View>
            </ScrollView> : <Text>Loading...</Text>}

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
                <Button mode="contained" onPress={showDialog} style={{ borderRadius: 13 }}>
                    Schedule tour
                </Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title style={styles.dialogueTitle}>January</Dialog.Title>
                        <Dialog.Content>
                            {/* Content for the dialog */}
                            <ScheduleTour showSnackBar={showSnackBar} hideDialog={hideDialog} />
                        </Dialog.Content>
                        {/* <Dialog.Actions>
                            <Button onPress={hideDialog}>Close</Button>
                        </Dialog.Actions> */}
                    </Dialog>
                </Portal>
            </View>

            <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)} style={styles.snackbar}>
                Tour scheduled successfully!
            </Snackbar>

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
        marginBottom: 10,

    },
    features: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 12,
        marginLeft:3,
        columnGap: 20,
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
    iconFeature: {
        backgroundColor: '#f2f2f2',
        // flexDirection: 'column',
        padding: 7,
        borderRadius: 100,
        width: 45,
    },
    featureText: {
        fontSize: 16,
        color: '#8c8c8c',
        marginTop: 5
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
        marginBottom: 10,

    },
    section: {
        marginTop: 17,
        marginBottom: 17,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
    },
    dialogueTitle: {
        textAlign: 'center',
        color: '#45729d',
        fontWeight: 'bold'
    },
    snackbar: {
        backgroundColor: 'green',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        margin: 23
    },
    lastSection: {
        marginBottom: 100,
    },
})