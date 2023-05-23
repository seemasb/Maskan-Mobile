import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, IconButton, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function SignInForm({ setUserLogged }) {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const handleSignIn = async () => {
        if (emailOrUsername === '' || password === '') {
            setSnackbarVisible(true);
            return;
        }

        const SignInData = {
            username_or_email: emailOrUsername,
            password: password,
        };
        console.log(SignInData);

        try {
            ROOT_URL ="http://18.198.203.6:8000";
            await axios.post(`${ROOT_URL}/accounts/login/`, {SignInData:SignInData})
            .then(response => {
                if (response.status === 200) {
                    // store the token in AsyncStorage
                    AsyncStorage.setItem('token', response.data.Token);
                
                    // set userLogged to true
                    setUserLogged(true);
                
                    console.log('Logged in successfully', response.data.Token);
                }
            })
            .catch(error => {
                console.error(error); 
                // handle error here
            });
            // console.log(response)

            // if (response.status === 200) {
            //   // store the token in AsyncStorage
            //   await AsyncStorage.setItem('token', response.data.Token);
          
            //   // set userLogged to true
            //   setUserLogged(true);
          
            //   console.log('Logged in successfully', response.data.Token);
            // }
        } catch (error) {
            // handle error here
            console.log('Error signing in:', error.response.data);
        }
    };

    const handleSnackbarDismiss = () => setSnackbarVisible(false);

    return (
        <View>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.lock}>
                        <FontAwesome5 name="unlock-alt" size={24} color={'#45729d'} />
                    </View>
                </View>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                    label="Email or Username"
                    value={emailOrUsername}
                    onChangeText={setEmailOrUsername}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="email-address"
                />
                <View>
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                    />

                    <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <Button onPress={() => console.log('forgot password clicked')} style={styles.forgotPassword}>
                    Forget your password?
                </Button>
                <Button mode="contained" onPress={handleSignIn} style={styles.signInButton}>
                    Sign In
                </Button>
                <Snackbar visible={snackbarVisible} onDismiss={handleSnackbarDismiss} duration={3000}>
                    Please enter both email or username and password.
                </Snackbar>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 15 }}>
                    <View style={{ width: 80, height: 1, backgroundColor: 'gray' }} />
                    <Text style={{ color: 'gray' }}>Or Sign In With</Text>
                    <View style={{ width: 80, height: 1, backgroundColor: 'gray' }} />
                </View>

                <View style={{ flexDirection: 'row', columnGap: 25, marginTop: 25 }}>

                    <FAB
                        icon={() => <Ionicons name="logo-google" size={25} color="#DB4437" />}
                        style={styles.fab}
                        onPress={() => console.log('Pressed')}
                    />
                    <FAB
                        icon={() => <FontAwesome name="facebook-official" size={25} color="#3B5998" />}
                        style={styles.fab}
                        onPress={() => console.log('Pressed')}
                    />
                    <FAB
                        icon={() => <MaterialCommunityIcons name="apple" size={25} color="#000" />}
                        style={styles.fab}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        padding: 40,
        marginTop: 30
        // backgroundColor: '#fff',
    },
    fab: {
        // margin: 16,
        backgroundColor: 'white',
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lock: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
    },
    title: {
        color: '#45729d',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginVertical: 10,
        // borderRadius: 20, // Change the border radius here
    },
    icon: {
        position: 'absolute',
        top: 30,
        right: 10,
    },
    forgotPassword: {
        alignSelf: 'flex-start',
        marginVertical: 4,
    },
    signInButton: {
        marginVertical: 16,
    },
});
