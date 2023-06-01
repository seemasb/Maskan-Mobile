import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import PropertyCard from '../Components/PropertiesComponents/PropertyCard';
import FilterProperties from '../Components/PropertiesComponents/FilterProperties';
import PropertySearch from '../Components/PropertiesComponents/PropertySearch';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import PropertyDetails from './PropertyDetails';
const Stack = createStackNavigator();



const PropertiesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Prperties"
                component={Properties}
                options={{
                    headerShown: false,
                    // title: 'Nested Navigator'
                }}
            />
            <Stack.Screen
                name="Property"
                component={PropertyDetails}
                options={{
                    headerTitle: '',
                    headerTintColor: '#45729d',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Stack.Navigator>
    );
};

export default PropertiesStack;

function Properties({ navigation }) {
    function MoveTodetails(CardData) {
        console.log('cardData:::' , CardData)
        // navigation.navigate('PropertyChatScreen')
        navigation.navigate('Property', { propName: CardData });

     }
    const [cardSearchResponse, setCradSearchResponse] = useState(null)
    return (
        <View style={styles.container}>
            <PropertySearch setCradSearchResponse={setCradSearchResponse} />
            <View style={styles.NearBy}>
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 5 }}>Nearby</Text>
                <Button onPress={() => navigation.navigate('Property')}>See all</Button>
            </View>

            <ScrollView style={styles.PropertiesList}>
                {cardSearchResponse
                 ?(cardSearchResponse.length >0 ?
                    cardSearchResponse.map((CardData) =>
                        <TouchableOpacity>
                            <PropertyCard CardData={CardData} is_inProfile={false} MoveTodetails={MoveTodetails}/>
                        </TouchableOpacity>
                        // onPress={() => navigation.navigate('Property')}
                    )
                    :
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', rowGap: 30 }}>
                        <Text style={{ fontSize: 25, color: 'lightgray' }}>No data matched</Text>
                    </View>)
                    :
                    <View style={[styles.ActivityIndicatorContainer, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#45729d" /></View>
                }
                {/* <PropertyCard />
                <PropertyCard /> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
        // padding: 25,
    },
    NearBy: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'space-between',
        zIndex: -100
    }
    ,
    PropertiesList: {
        // backgroundColor: 'blue',
        zIndex: -100
    },
    ActivityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      }

})

// export default Properties;