import { StyleSheet, Text, View } from 'react-native';
import PropertyCard from '../Components/PropertiesComponents/PropertyCard';
import FilterProperties from '../Components/PropertiesComponents/FilterProperties';
import PropertySearch from '../Components/PropertiesComponents/PropertySearch';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function Properties() {
    return (
        <View style={styles.container}>
            <PropertySearch />
            <View style={styles.NearBy}>
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 5 }}>Nearby</Text>
                <Button>See all</Button>
            </View>
            <ScrollView style={styles.PropertiesList}>
                <PropertyCard />
                <PropertyCard />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // padding: 25,
    },
    NearBy: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'space-between',
    }
    ,
    PropertiesList: {
        // backgroundColor: 'blue',
    }


})

export default Properties;