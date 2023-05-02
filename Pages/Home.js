import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { TextInput, Button, Title, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function Home() {
    return (
        // <ScrollView style={{flex: 1}}>
            <ImageBackground
                source={require('../assets/hero.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.homeContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginVertical: 60, marginLeft: -20 }}>
                        <MaterialIcons name="roofing" size={45} color="gray" />
                        <Title style={styles.title}>Maskan</Title>
                    </View>
                    <View>
                        <Text style={styles.slogan}>Let's find a home that's perfect for you!</Text>
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.searchField}
                                placeholder="Enter city or address"
                                right={
                                    <TextInput.Icon
                                        name="magnify"
                                        color="#45729d"
                                        onPress={() => console.log('Search')}
                                    />
                                }
                                mode="outlined"
                                theme={{
                                    roundness: 20,
                                    colors: {
                                        primary: '#45729d',
                                        background: '#ffffff',
                                        placeholder: '#9e9e9e',
                                    },
                                }}
                            />
                            {/* <Button style={styles.searchButton} mode="contained">
                        Search
                    </Button> */}
                        </View>
                    </View>
                    {/* <Text style={styles.slogan2}>
                    Discover the best properties in your area
                </Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 130 }}>
                        <IconButton
                            style={styles.button}
                            icon={() => (
                                <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={50}
                                    style={styles.icon}
                                />
                            )}
                        />
                    </View>
                </View>
            </ImageBackground>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        // borderRadius: 50,
        // margin: 20
    },
    homeContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: 20,
        borderRadius: 50,
        padding: 20,
        width: '90%',
        maxWidth: 500,
    },
    title: {
        color: '#45729d',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 50,
        paddingTop: 20
    },
    slogan: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2c4a66',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
    },
    searchField: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    searchButton: {
        backgroundColor: '#45729d',
        marginTop: 20,
    },
    slogan2: {
        fontSize: 18,
        color: '#2c4a66',
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#45729d',
        opacity: 0.5,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    icon: {
        color: 'white',
    },
});

export default Home;