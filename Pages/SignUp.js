import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, ProgressBar, Text, Title, TextInput } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneInput from 'react-native-phone-number-input';
import UploadImages from '../Components/SignUpComponents/UploadImages';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, Divider } from 'react-native-paper';


const Stack = createStackNavigator();

const SignUpForm = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(new Date());



    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSignUp = () => {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        // Code to sign up user
    };

    const isStepCompleted = (stepNumber) => {
        return stepNumber < step;
    };



    return (
        <View style={styles.container}>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                <Title style={styles.title}>Welcome</Title>
            </View> */}
            {/* <View style={styles.lock}>
                <FontAwesome5 name="unlock-alt" size={30} color={'#45729d'} />
            </View> */}
            {/* <ProgressBar progress={step / 3} color="#4caf50" style={styles.progress} /> */}
            <View style={styles.stepContainer}>
                <View style={styles.step}>
                    <Text style={[styles.stepNumber, isStepCompleted(1) && styles.stepCompleted]}>
                        Registeration
                    </Text>
                    {/* <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Step 1')}
                        style={styles.button}
                    >
                        Step 1
                    </Button> */}
                </View>
                <View style={styles.step}>
                    <Text style={[styles.stepNumber, isStepCompleted(2) && styles.stepCompleted]}>
                        Personal Info
                    </Text>
                    {/* <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Step 2')}
                        style={styles.button}
                    >
                        Step 2
                    </Button> */}
                </View>
                <View style={styles.step}>
                    <Text style={[styles.stepNumber, isStepCompleted(3) && styles.stepCompleted]}>
                        Verify Acoount
                    </Text>
                    {/* <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Step 3')}
                        style={styles.button}
                    >
                        Step 3
                    </Button> */}
                </View>
            </View>
            <ProgressBar progress={step / 3} color="#4caf50" style={styles.progress} />

            <View style={styles.content}>
                {step === 1 && (

                    <View style={styles.formContainer}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 10 }}>
                            <View style={styles.lock}>
                                <FontAwesome5 name="unlock-alt" size={25} color={'#45729d'} />
                            </View>
                            <Title style={styles.title}>Registeration</Title>
                        </View>
                        <ScrollView >
                            {/* <Text>hi</Text> */}
                            <View style={styles.fieldsContainer}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TextInput
                                        label="First name"
                                        value={firstName}
                                        mode="outlined"
                                        onChangeText={(text) => setFirstName(text)}
                                        style={styles.inputHalfWidth}
                                    />

                                    <TextInput
                                        label="Last name"
                                        value={lastName}
                                        mode="outlined"
                                        onChangeText={(text) => setLastName(text)}
                                        style={styles.inputHalfWidth}
                                    />
                                </View>
                                <TextInput
                                    label="Email"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    mode="outlined"
                                    style={styles.input}
                                    keyboardType="email-address"
                                />
                                <TextInput
                                    label="Username"
                                    value={username}
                                    onChangeText={(text) => setUsername(text)}
                                    mode="outlined"
                                    style={styles.input}
                                    keyboardType="username"
                                />

                                <TextInput
                                    label="Password"
                                    value={password}
                                    mode="outlined"
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry
                                    style={styles.input}
                                />
                                <PhoneInput
                                    textContainerStyle={{
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        borderRadius: 3,
                                        // paddingHorizontal: 10,
                                        paddingVertical: 10,
                                        marginRight: -30
                                    }}
                                    defaultCode="US"
                                    placeholder="Enter phone number"
                                    onChangeText={(text) => {
                                        // handle phone number change
                                        setPhone(text);
                                    }}
                                    onChangeFormattedText={(text) => {
                                        // handle formatted phone number change
                                    }}
                                />
                                <TextInput
                                    label="Date Picker"
                                    value={password}
                                    mode="outlined"
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry
                                    style={styles.input}
                                />
                            </View>
                        </ScrollView>
                        <View style={{ backgroundColor: 'white', width: '100%', height: 70 }}>
                            <Button mode="contained" onPress={handleNextStep} style={styles.button}>
                                Next
                            </Button>
                        </View>
                    </View>
                )}
                {step === 2 && (
                    <View style={styles.formContainer}>
                        <ScrollView>
                            <UploadImages />
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                            <Button mode="contained" onPress={handlePrevStep} style={styles.nextANDprevious}>
                                Previous
                            </Button>
                            <Button mode="contained" onPress={handleNextStep} style={styles.nextANDprevious}>
                                Next
                            </Button>

                        </View>
                    </View>
                )}
                {step === 3 && (
                    <View style={styles.formContainer}>
                        <View style={{flex: 0 , alignItems: 'center', justifyContent: 'center' , marginTop: '30%' }}>
                            <Avatar.Icon size={100} icon="email" />
                            <Text style={{ fontSize: 23, color: 'gray', marginTop: 20 }}>Verify your email</Text>
                            <Divider style={{ height: 2, width: '80%', backgroundColor: 'lightgray', marginVertical: 20 }} />
                            <Text style={{ fontSize: 16, color: 'lightgray', textAlign: 'center' }}>
                                A verification email has been sent to your email, please verify your email address!
                            </Text>
                        </View>
                        <Button mode="contained" onPress={handlePrevStep} style={styles.button}>
                            Sign In
                        </Button>
                    </View>
                )}
            </View>
        </View>
    );
};

export default SignUpForm;

const SignUpStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignUp"
                component={SignUpForm}
                options={{
                    headerStyle: { backgroundColor: '#45729d' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Stack.Screen
                name="Step 1"
                component={() => <View><Text>Step 1</Text></View>}
                options={{
                    headerStyle: { backgroundColor: '#45729d' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Stack.Screen
                name="Step 2"
                component={() => <View><Text>Step 2</Text></View>}
                options={{
                    headerStyle: { backgroundColor: '#45729d' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Stack.Screen
                name="Step 3"
                component={() => <View><Text>Step 3</Text></View>}
                options={{
                    headerStyle: { backgroundColor: '#45729d' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 25,
        // backgroundColor: 'red',
        paddingTop: 30,
        // backgroundColor: 'blue'

    },
    title: {
        color: '#45729d',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progress: {
        marginBottom: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    step: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumber: {
        fontSize: 15,
        // fontWeight: 'bold',
        color: 'gray',
        // marginBottom: 5,
    },
    stepCompleted: {
        color: '#45729d',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#45729d',
        color: 'white',
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
    nextANDprevious: {
        backgroundColor: '#45729d',
        color: 'white',
        width: '47%',
    },
    content: {
        flex: 1,
        // backgroundColor: 'blue'
    },
    formContainer: {
        flex: 1,


        // alignItems: 'center',
        // justifyContent: 'center',
    },
    fieldsContainer: {
        // justifyContent: 'space-between',
        // backgroundColor: 'red',
        flex: 1,
        rowGap: 15, 
        marginBottom: 20
    },
    input: {
        // marginBottom: 10,
        width: '100%',
        // backgroundColor: 'red',
    },
    inputHalfWidth: {
        width: '48%',
    },
    lock: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: '#f2f2f2',
    },
});

// export default SignUpStack;
