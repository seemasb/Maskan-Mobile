// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from './Calendar';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Info!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Properities!</Text>
        </View>
    );
}

function ChatScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>chatting!</Text>
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

export default function App() {
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
            <Tab.Screen name="Info" component={HomeScreen} />
            <Tab.Screen name="Properties" component={SettingsScreen} />
            <Tab.Screen name="chat" component={ChatScreen} />
            <Tab.Screen name="Calendar" component={Calendar} />
        </Tab.Navigator>
    );
}
