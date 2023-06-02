import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Button, Divider, List, useTheme, Badge, IconButton } from 'react-native-paper';
import Pic from '../../assets/pool_1.jpg'
import ScheduleCreation from './ScheduleCreation';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
const Stack = createStackNavigator();

const ProfileInfoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileInfo}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Schedule"
                component={ScheduleCreation}
                options={{
                    headerTitle: '',
                    // headerStyle: { backgroundColor: '#45729d' },
                    headerTintColor: '#45729d',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileInfoStack;


const ProfileInfo = ({ navigation}) => {
    const { colors } = useTheme();
    const [userEmail, setUserEmail] = useState("johndoe@example.com");
    const [userPhoneNumber, setUserPhoneNumber] = useState("+1 555-555-5555");
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [userUsername, setUserUsername] = useState('Guest user');
    const [userBirthDate, setUserBirthDate] = useState("January 1, 1990");
    const [userIDCard, setUserIDCard] = useState(null);


    useEffect(() => {
        async function getUserData() {
          try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                ROOT_URL ="http://18.198.203.6:8000";
                const response = await axios.get(`${ROOT_URL}/accounts/users/${token}`);
                if(response.status ===200)
                {
                    const user = response.data;
                    console.log(user);
                    setUserEmail(user.email);
                    setUserPhoneNumber(user.phone_number);
                    setUserProfilePicture(user.profile.profile_picture);
                    setUserUsername(user.username);
                    setUserBirthDate(user.date_of_birth);
                    setUserIDCard(user.profile.ID_card);
                }
                else{
                    console.log(response.data);
                }
            } else {
                console.log('Value does not exist'); // Value does not exist
            }
          } catch (error) {
            console.log(error);
          }
        }
    
        getUserData();
      }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.header}>

                    {userProfilePicture!==null &&<Avatar.Image
                        source={{ uri: userProfilePicture }}
                        size={180}
                        style={styles.avatar}
                    />}
                    {/* <IconButton
                        icon="camera"
                        color="#45729d"
                        size={20}
                        style={{ position: 'absolute', bottom: 30, right: 130 , backgroundColor: 'lightgray'}}
                        onPress={() => console.log('Pressed')}
                    /> */}
                    <Text style={[styles.title, { color: colors.text }]}>{userUsername}</Text>

                    {/* <Button
                        icon="camera"
                        mode="contained"
                        onPress={() => console.log('Pressed')}>
                        Change Picture
                    </Button> */}
                </View>

                <Divider />

                <List.Section style={{ paddingLeft: 25 }}>
                    <List.Subheader>Profile Information</List.Subheader>
                    {/* <Text>Profile Information</Text> */}
                    <List.Item
                        title="Email"
                        description= {userEmail}
                        left={() => <List.Icon icon="email" color={colors.primary} />}
                    />
                    <List.Item
                        title="Phone Number"
                        description={userPhoneNumber}
                        left={() => <List.Icon icon="phone" color={colors.primary} />}
                    />
                    <List.Item
                        title="Birthdate"
                        description={userBirthDate}
                        left={() => <List.Icon icon="cake" color={colors.primary} />}
                    />
                </List.Section>
                {/* <Divider /> */}

                <List.Section style={{ alignItems:'center' }}>
                    <List.Subheader>ID Image</List.Subheader>
                        
                        <Image
                            source={{ uri: userIDCard }}
                            style={{ width: 380, height: 200, alignSelf:'center',alignItems:'center' }}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    {/* <Avatar.Image
                        source={{uri:userIDCard}}
                        size={150}
                        style={styles.avatar}
                    />  <List.Item
                        left={() => <List.Icon icon="image" color={colors.primary} />}
                    /> */}
                </List.Section>

                <Button
                    onPress={() => navigation.navigate('Schedule')}
                    icon="calendar"
                    mode="outlined"
                    style={styles.CreateSchedule}
                >
                    Create Schedule
                </Button>
                {/* <Divider /> */}
                {/* <List.Section>
                    <List.Subheader>Settings</List.Subheader>
                    <List.Item
                        title="Random Setting 1"
                        left={() => <List.Icon icon="cog" color={colors.primary} />}
                    />
                    <List.Item
                        title="Random Setting 2"
                        left={() => <List.Icon icon="cog" color={colors.primary} />}
                    />
                    <List.Item
                        title="Random Setting 3"
                        left={() => <List.Icon icon="cog" color={colors.primary} />}
                    />
                </List.Section> */}
                {/* <ScheduleCreation /> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    avatar: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    CreateSchedule: {
        // width: '50%'
        marginHorizontal: 25
    }
});

// export default ProfileInfo;
