import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Button, Divider, List, useTheme, Badge, IconButton } from 'react-native-paper';
import Pic from '../../assets/pool_1.jpg'
import ScheduleCreation from './ScheduleCreation';
import { createStackNavigator } from '@react-navigation/stack';

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


const ProfileInfo = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.header}>

                    <Avatar.Image
                        source={Pic}
                        size={150}
                        style={styles.avatar}
                    />
                    {/* <IconButton
                        icon="camera"
                        color="#45729d"
                        size={20}
                        style={{ position: 'absolute', bottom: 30, right: 130 , backgroundColor: 'lightgray'}}
                        onPress={() => console.log('Pressed')}
                    /> */}
                    <Text style={[styles.title, { color: colors.text }]}>Seema Sbouh</Text>

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
                        description="johndoe@example.com"
                        left={() => <List.Icon icon="email" color={colors.primary} />}
                    />
                    <List.Item
                        title="Phone Number"
                        description="+1 555-555-5555"
                        left={() => <List.Icon icon="phone" color={colors.primary} />}
                    />
                    <List.Item
                        title="Birthdate"
                        description="January 1, 1990"
                        left={() => <List.Icon icon="cake" color={colors.primary} />}
                    />
                </List.Section>
                {/* <Divider /> */}

                <List.Section style={{ paddingLeft: 25 }}>
                    <List.Subheader>ID Image</List.Subheader>
                    <List.Item
                        left={() => <List.Icon icon="image" color={colors.primary} />}
                    />
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
