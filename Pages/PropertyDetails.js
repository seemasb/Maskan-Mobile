import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Gallary from "../Components/PropertyDetailsComponents/Gallary";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, Divider, FAB } from "react-native-paper";
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
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomList from '../Components/Chat/ChatRoomList'
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { collection, addDoc, onSnapshot, orderBy, query, getDocs, where } from "firebase/firestore";
import { db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ROOT_URL from "../Components/ProfileComponents/config";

const Stack = createStackNavigator();



const DetailsChatStack = () => {
    const route = useRoute();
    console.log('route stack:::', route)
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Details"
                component={() => <PropertyDetails route={route} />} // Pass the route object as a prop
                options={{
                    headerShown: false,
                    // title: 'Nested Navigator'
                }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatRoomList}
                options={{
                    // headerShown: false,
                    headerTitle: '',
                    headerTintColor: '#45729d',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Stack.Navigator>
    );
};

export default DetailsChatStack;


function PropertyDetails({ route }) {
    // const route = useRoute();
    console.log('route prperty details:::', route)
    const navigation = useNavigation(); // Get the navigation object

    const { propName } = route.params;
    const [visible, setVisible] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState();
    const [ownerId, setOwnerId] = useState();
    const [userId, setUserId] = useState();

    function MoveToChatScreen() {
        createChatRoomTest(userId, ownerId)
        // navigation.navigate('Chat')
        // navigation.navigate('Property', { propName: CardData });
    }

    const createChatRoomTest = async (participant1Id, participant2Id) => {
        try {
            // Check if a conversation already exists between the two participants
            const querySnapshot1 = await getDocs(query(
                collection(db, "chatRooms"),
                where("participants", "array-contains", participant1Id)
            ));

            const querySnapshot2 = await getDocs(query(
                collection(db, "chatRooms"),
                where("participants", "array-contains", participant2Id)
            ));

            // Find the common chatroom ID (if exists)
            let chatRoomId;
            querySnapshot1.forEach(doc1 => {
                querySnapshot2.forEach(doc2 => {
                    if (doc1.id === doc2.id) {
                        chatRoomId = doc1.id;
                        navigation.navigate('Chat')
                        return;
                    }
                });
            });

            if (chatRoomId) {
                // Conversation already exists, return the chatroom ID
                console.log("Conversation already exists. Chatroom ID:", chatRoomId);
                navigation.navigate('Chat')
                return chatRoomId;
            }

            // Conversation doesn't exist, create a new chatroom
            const chatRoom = await addDoc(collection(db, "chatRooms"), {
                participants: [participant1Id, participant2Id],
                messages: [],
            });

            chatRoomId = chatRoom.id;
            console.log("New chatroom created. Chatroom ID:", chatRoomId);
            return chatRoomId;
        } catch (e) {
            console.error("Error creating or retrieving chatroom: ", e);
        }
    };



    useEffect(() => {
        const getPropertyDetails = async () => {
            try {
                propertyId = propName.id;
                const response = await axios.get(`${ROOT_URL}/properties/home/${propertyId}/`)
                setPropertyDetails(response.data)
                setOwnerId(response.data.owner)
                console.log(response.data.features.data)
            } catch (error) {
                console.log(error)
            }
        }

        async function getUserData() {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    ROOT_URL = "http://18.198.203.6:8000";
                    const response = await axios.get(`${ROOT_URL}/accounts/users/${token}`);
                    if (response.status === 200) {
                        const user = response.data;
                        console.log(user);
                        setUserId(user.id)
                    }
                    else {
                        console.log(response.data);
                    }
                } else {
                    console.log('Value does not exist'); // Value does not exist
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPropertyDetails()
        getUserData();
        

    }, [])

    useEffect(()=>{
        console.log('user id:::' , userId)
        console.log('owner id:::' , ownerId)
    },[userId , ownerId])

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
                        <Text style={styles.price}>{propertyDetails.price}{propertyDetails.state === "S" ? ' $' : '$ / Year'}</Text>
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
                                            {item.key === "accessible" && <FontAwesome5 name="accessible-icon" size={30} color="#45729d" />}
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

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                <Avatar.Text size={45} label="S" />
                                <View>
                                    <Text style={{ lineHeight: 20, letterSpacing: 1, fontWeight: 'bold', color: 'gray' }}>
                                        {propertyDetails.owner_name}
                                    </Text>
                                    <Text style={{ color: '#8c8c8c', lineHeight: 20, letterSpacing: 1 }}>
                                        Owner
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.messageButton} onPress={MoveToChatScreen}>
                                <AntDesign name="message1" size={24} color="#45729d" />
                            </TouchableOpacity>
                        </View>
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
                                    coordinate={{ latitude: propertyDetails.location.data.lat, longitude: propertyDetails.location.data.lng }}
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
                        <Dialog.Title style={styles.dialogueTitle}>June</Dialog.Title>
                        <Dialog.Content>
                            {propertyDetails?
                            <ScheduleTour showSnackBar={showSnackBar} hideDialog={hideDialog} property_owner_id={propertyDetails.owner} property_id={propertyDetails.id} />:
                            <></>}
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

// export default PropertyDetails

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
        marginLeft: 3,
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
    messageButton: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 30
    },
})