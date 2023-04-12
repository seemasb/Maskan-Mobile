import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const FilterProperties = () => {
    const theme = useTheme();
    const [city, setCity] = useState(null);
    const [status, setStatus] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [areaRange, setAreaRange] = useState([0, 500]);
    const [searchDisabled, setSearchDisabled] = useState(true);

    const handleCityChange = (value) => {
        setCity(value);
        setSearchDisabled(!value || !status);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setSearchDisabled(!city || !value);
    };

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    const handleAreaRangeChange = (value) => {
        setAreaRange(value);
    };

    const handleSearchPress = () => {
        console.log('Search pressed!');
    };

    const priceRangeValues = [
        priceRange[0].toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        priceRange[1].toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    ];
    const areaRangeValues = [
        areaRange[0].toLocaleString('en-US') + ' sqft',
        areaRange[1].toLocaleString('en-US') + ' sqft',
    ];

    return (
        <View style={styles.container}>
            {/* <View style={styles.row}>
                <View style={styles.column}>
                    <RNPickerSelect
                        placeholder={{ label: 'Select city', value: null }}
                        value={city}
                        onValueChange={handleCityChange}
                        items={[
                            { label: 'San Francisco', value: 'san_francisco' },
                            { label: 'New York', value: 'new_york' },
                            { label: 'Los Angeles', value: 'los_angeles' },
                        ]}
                    />
                </View>
                <View style={styles.column}>
                    <RNPickerSelect
                        placeholder={{ label: 'Select status', value: null }}
                        value={status}
                        onValueChange={handleStatusChange}
                        items={[
                            { label: 'Buy', value: 'buy' },
                            { label: 'Rent', value: 'rent' },
                        ]}
                    />
                </View>
            </View> */}
            <Divider style={styles.divider} />
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Price Range</Text>
                    <MultiSlider
                        values={priceRange}
                        sliderLength={280}
                        onValuesChange={handlePriceRangeChange}
                        min={0}
                        max={1000000}
                        step={10000}
                        allowOverlap={false}
                        snapped
                        customMarker={(e) => (
                            <View style={[styles.marker, { backgroundColor: theme.colors.primary }]}>
                                <Text style={styles.markerText}>{e.currentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                            </View>
                        )}
                        customLabel={false}
                        trackStyle={styles.track}
                        markerContainerStyle={styles.markerContainer}
                    />
                    <View style={styles.rangeLabel}>
                        <Text style={[styles.rangeLabelText, { color: theme.colors.text }]}>{priceRangeValues[0]}</Text>
                        <Text style={[styles.rangeLabelText, { color: theme.colors.text }]}>{priceRangeValues[1]}</Text>
                    </View>
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Area Range</Text>
                    <MultiSlider
                        values={areaRange}
                        sliderLength={280}
                        onValuesChange={handleAreaRangeChange}
                        min={0}
                        max={500}
                        step={1}
                        allowOverlap={false}
                        snapped
                        customMarker={(e) => (
                            <View style={[styles.marker, { backgroundColor: theme.colors.primary }]}>
                                <Text style={styles.markerText}>{e.currentValue.toLocaleString('en-US') + ' sqft'}</Text>
                            </View>
                        )}
                        customLabel={false}
                        trackStyle={styles.track}
                        markerContainerStyle={styles.markerContainer}
                    />
                    <View style={styles.rangeLabel}>
                        <Text style={[styles.rangeLabelText, { color: theme.colors.text }]}>{areaRangeValues[0]}</Text>
                        <Text style={[styles.rangeLabelText, { color: theme.colors.text }]}>{areaRangeValues[1]}</Text>
                    </View>
                </View>
            </View>
            <Divider style={styles.divider} />
            <Button
                mode="contained"
                onPress={handleSearchPress}
                disabled={searchDisabled}
                style={[styles.searchButton, { backgroundColor: searchDisabled ? theme.colors.disabled : theme.colors.primary }]}
                labelStyle={styles.searchButtonText}
            >
                Search
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        marginHorizontal: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        marginVertical: 16,
    },
    marker: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    track: {
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E5E5',
    },
    markerContainer: {
        top: -24,
    },
    rangeLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 8,
    },
    rangeLabelText: {
        fontSize: 14,
    },
    searchButton: {
        marginTop: 16,
        borderRadius: 24,
    },
    searchButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default FilterProperties;    
