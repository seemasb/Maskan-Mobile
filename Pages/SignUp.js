import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ProgressBar, Text, Title, TextInput } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneInput from 'react-native-phone-number-input';




const Stack = createStackNavigator();

const SignUpForm = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
            {/* <Title style={styles.title}>Sign Up</Title> */}
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
                        {/* <Text>hi</Text> */}
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                label="First name"
                                value={name}
                                mode="outlined"
                                onChangeText={(text) => setName(text)}
                                style={styles.inputHalfWidth}
                            />

                            <TextInput
                                label="Last name"
                                value={name}
                                mode="outlined"
                                onChangeText={(text) => setName(text)}
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
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            mode="outlined"
                            style={styles.input}
                            keyboardType="email-address"
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
                        <Button mode="contained" onPress={handleNextStep} style={styles.button}>
                            Next
                        </Button>
                    </View>
                )}
                {step === 2 && (
                    <View style={styles.formContainer}>
                        <TextInput
                            label="Optional field"
                            value={''}
                            onChangeText={() => { }}
                            style={styles.input}
                        />
                        <Button mode="contained" onPress={handleNextStep} style={styles.button}>
                            Next
                        </Button>
                        <Button mode="outlined" onPress={handlePrevStep} style={styles.button}>
                            Previous
                        </Button>
                    </View>
                )}
                {step === 3 && (
                    <View style={styles.formContainer}>
                        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
                            Sign Up
                        </Button>
                        <Button mode="outlined" onPress={handlePrevStep} style={styles.button}>
                            Previous
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
    },
    // title: {
    //     color: '#45729d',
    //     fontSize: 28,
    //     fontWeight: 'bold',
    //     marginBottom: 20,
    // },
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
    input: {
        marginBottom: 10,
        width: '100%',
        // backgroundColor: 'red',
    },
    inputHalfWidth: {
        width: '48%',
    }
});

// export default SignUpStack;
