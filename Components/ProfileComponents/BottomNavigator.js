// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from './Calendar';
import ProfileInfo from './ProfileInfo';
import PropertyList from './PropertyList';

import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomList from '../Chat/ChatRoomList';
import ChatScreen from '../Chat/ChatScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Properities!</Text>
        </View>
    );
}

function ChatScreenTop() {
    return (
        <View style={{ flex: 1 , backgroundColor: 'white'}}>
            {/* <Text>chatting!</Text> */}
            <ChatRoomList/>
            {/* <ChatScreen chatRoomId={'4ZVbFLq5WydxnS8UDFID'} userId={1} participantId={2}/> */}

        </View>
    );
}

function CalendarScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>calendar!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
// const TabTop = createMaterialTopTabNavigator();



export default function App() {
    // function ProfileScreen() {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>Info!</Text>
    //             <Stack.Navigator>
    //                 <Stack.Screen name="Home" component={ProfileInfo} />
    //                 <Stack.Screen name="Other" component={ChatScreen} />
    //             </Stack.Navigator>
    //         </View>
    //     );
    // }
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Info') {
                        iconName = focused
                            ? 'user-alt'
                            : 'user';
                        return <FontAwesome5 name={iconName} size={size} color={color} />
                    } else if (route.name === 'Properties') {
                        iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'chat') {
                        iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Calendar') {
                        iconName = focused ? 'ios-calendar' : 'ios-calendar-sharp';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    // You can return any component that you like here!
                    // return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#45729d',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarLabel: '',
            })}
        >
            <Tab.Screen name="Info" component={ProfileInfo}  />
            <Tab.Screen name="Properties" component={PropertyList} />
            <Tab.Screen name="chat" component={ChatScreenTop} />
            <Tab.Screen name="Calendar" component={Calendar} />
        </Tab.Navigator>

    );
}
