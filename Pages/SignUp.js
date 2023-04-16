import React, { useState } from 'react';
import { StyleSheet, View , TextInput } from 'react-native';
import { Button, ProgressBar, Text, Title } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SignUpForm = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <Title style={styles.title}>Sign Up</Title>
            <ProgressBar progress={step / 3} color="#4caf50" style={styles.progress} />
            <View style={styles.stepContainer}>
                <View style={styles.step}>
                    <Text style={[styles.stepNumber, isStepCompleted(1) && styles.stepCompleted]}>
                        1
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Step 1')}
                        style={styles.button}
                    >
                        Step 1
                    </Button>
                </View>
                <View style={styles.step}>
                    <Text style={[styles.stepNumber, isStepCompleted(2) && styles.stepCompleted]}>
                        2
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Step 2')}
                        style={styles.button}
                    >
                        Step 2
                    </Button>
                </View>
                <View style={styles.step}>
                    <Text style={[styles.stepNumber, isStepCompleted(3) && styles.stepCompleted]}>
                        3
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Step 3')}
                        style={styles.button}
                    >
                        Step 3
                    </Button>
                </View>
            </View>
            <View style={styles.content}>
                {step === 1 && (
                    <View style={styles.formContainer}>
                        <TextInput
                            label="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                            style={styles.input}
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
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        color: '#45729d',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#45729d',
        marginBottom: 5,
    },
    stepCompleted: {
        color: '#4caf50',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#45729d',
    },
    content: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10,
        width: '100%',
    },
});

export default SignUpStack;
