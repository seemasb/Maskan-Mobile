import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';


const UploadImages = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [idScan, setIdScan] = useState(null);



    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required!');
            }
        })();
    }, []);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            setProfileImage(result.uri);
        }
    };

    const handlePickID = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            setIdScan(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 , marginBottom: 20 }}>
            <View style={{ marginBottom: 20 }}>
                {profileImage ? (
                    <View>
                        <Image
                            source={{ uri: profileImage }}
                            style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 20 }}
                        />
                        <Button icon="delete" mode="outlined" onPress={()=> setProfileImage(null)}>
                            delete Profile Picture
                        </Button>
                    </View>
                ) : (
                    <View>
                        <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: 'lightgray', position: 'relative', marginBottom: 20 }}>
                            <FontAwesome name="user" size={100} color="white" style={{ position: 'absolute', top: 45, left: 65 }} />
                        </View>
                        <Button icon="camera" mode="outlined" onPress={handlePickImage}>
                            Upload Profile Picture
                        </Button>
                    </View>
                )}
            </View>
            <View style={{ alignItems: 'center' }}>
                {idScan ? (
                    <View>
                        <Image
                            source={{ uri: idScan }}
                            style={{ width: 180, height: 100 , marginBottom: 20 }}
                        />
                        <Button icon="delete" mode="outlined" onPress={()=> setIdScan(null)}>
                            Delete ID Scan
                        </Button>
                    </View>
                ) : (
                    <View>
                        <View style={{ width: 180, height: 100, backgroundColor: 'lightgray', position: 'relative', marginBottom: 20 }}>
                            <FontAwesome name="file-text-o" size={50} color="white" style={{ position: 'absolute', top: 25, left: 70 }} />
                        </View>
                        <Button icon="file" mode="outlined" onPress={handlePickID}>
                            Upload ID Scan
                        </Button>
                    </View>
                )}
            </View>
        </View>
    );
};

export default UploadImages;
