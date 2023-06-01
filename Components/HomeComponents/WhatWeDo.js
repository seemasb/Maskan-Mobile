import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Text, Provider as PaperProvider } from 'react-native-paper';
// import { FaLock, FaHandHoldingUsd, FaComments, FaStar } from 'react-icons/fa';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const WhatWeDo = () => {
    return (
        <PaperProvider>
            <View style={styles.whatWeDoContainer}>
                <Title style={styles.whatWeDoTitle}>What We Do?</Title>
                <View style={styles.featureBoxContainer}>
                    <View style={styles.featureBox}>
                        <View style={styles.featureIconWrapper}>
                            {/* <FaLock size={35} color="#45729d" /> */}
                            <Ionicons name="lock-closed" size={35} color="#45729d" />
                        </View>
                        <Title style={styles.featureTitle}>Reliability</Title>
                        <Text style={styles.featureDescription}>
                            We are committed to providing reliable and trustworthy services.
                        </Text>
                    </View>
                    <View style={styles.featureBox}>
                        <View style={styles.featureIconWrapper}>
                        <Fontisto name="dollar" size={35} color="#45729d" />

                        </View>
                        <Title style={styles.featureTitle}>Best Price</Title>
                        <Text style={styles.featureDescription}>
                            We strive to ensure that our clients get the best price.
                        </Text>
                    </View>
                    <View style={styles.featureBox}>
                        <View style={styles.featureIconWrapper}>
                        <Ionicons name="people" size={35} color="#45729d" />

                        </View>
                        <Title style={styles.featureTitle}>Communication</Title>
                        <Text style={styles.featureDescription}>
                            We strive to ensure effective communication with our clients.
                        </Text>
                    </View>
                    <View style={styles.featureBox}>
                        <View style={styles.featureIconWrapper}>
                        <Ionicons name="star" size={35} color="#45729d" />

                        </View>
                        <Title style={styles.featureTitle}>Quality</Title>
                        <Text style={styles.featureDescription}>
                            We strive to ensure high-quality services for our clients.
                        </Text>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    whatWeDoContainer: {
        paddingVertical: 60,
        // backgroundColor:'red'
        // paddingHorizontal: 16,
    },
    whatWeDoTitle: {
        color: '#45729d',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 25
    },
    featureBoxContainer: {
        flexDirection: 'column',
        // flexWrap: 'wrap',
        alignItems: 'center',
    },
    featureBox: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 25,
        margin: 20,
        // textAlign: 'center',
        // maxWidth: 300,
        width:300,
        shadowColor: '#0b0705',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    featureIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        width: 64,
        borderRadius: 50,
        backgroundColor: '#efecec',
        marginVertical: 0,
    },
    featureTitle: {
        color: '#45729d',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    featureDescription: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
    },
});

export default WhatWeDo;
