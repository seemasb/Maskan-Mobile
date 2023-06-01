import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, IconButton, Switch, TextInput } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import ROOT_URL from './config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleCreation = () => {
    const [days, setDays] = useState([
        { day: 'Monday', selected: false, time: [] },
        { day: 'Tuesday', selected: false, time: [] },
        { day: 'Wednesday', selected: false, time: [] },
        { day: 'Thursday', selected: false, time: [] },
        { day: 'Friday', selected: false, time: [] },
        { day: 'Saturday', selected: false, time: [] },
        { day: 'Sunday', selected: false, time: [] },
    ]);

    const toggleDay = (index) => {
        setDays((prev) => {
            const newDays = [...prev];
            newDays[index].selected = !newDays[index].selected;
            return newDays;
        });
    };

    const addTime = (dayIndex, time) => {
        setDays((prev) => {
            const newDays = [...prev];
            newDays[dayIndex].time.push(time);
            return newDays;
        });
    };

    const removeTime = (dayIndex, timeIndex) => {
        setDays((prev) => {
            const newDays = [...prev];
            newDays[dayIndex].time.splice(timeIndex, 1);
            return newDays;
        });
    };

    //////////////////Time picker/////////////////////////
    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            console.log({ hours, minutes });
        },
        [setVisible]
    );

    const renderTimePicker = (dayIndex) => {
        return days[dayIndex].time.map((time, index) => (
            <View key={index} style={styles.timePickerContainer}>
                <View style={{flexDirection: 'row' , alignItems: 'center'}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
                            Start time
                        </Button>
                        <TimePickerModal
                            visible={visible}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            hours={12}
                            minutes={0}
                        />
                    </View>
                    <Text style={{marginHorizontal: 10}}>-</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
                            End time
                        </Button>
                        <TimePickerModal
                            visible={visible}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            hours={12}
                            minutes={0}
                        />
                    </View>
                </View>
                {/* <TimePicker label={`Time ${index + 1}`} value={time} mode='time' onChange={(time) => addTime(dayIndex, time)} /> */}
                <IconButton icon='delete' color='#45729d' onPress={() => removeTime(dayIndex, index)} />
            </View>
        ));
    };

    const renderDay = (day, index) => {
        return (
            <View>
                <View key={index} style={styles.dayContainer}>
                    <View style={styles.daySwitchContainer}>
                        <Switch value={day.selected} onValueChange={() => toggleDay(index)} />
                        {/* <TextInput style={styles.dayLabel} label={day.day} mode='flat' disabled /> */}
                        <Text style={styles.dayLabel}>{day.day}</Text>
                    </View>
                    {day.selected && (
                        <View>
                            <IconButton icon='plus' color='#45729d' onPress={() => addTime(index, null)} />
                        </View>
                    )}
                </View>

                <View>
                    {day.selected && (
                        <View>
                            {renderTimePicker(index)}
                        </View>
                    )}

                </View>
            </View>
        );
    };

    const handleSchedule = () => {
        const selectedDays = days.filter((day) => day.selected);
        const userToken = AsyncStorage.getItem('token')
        let header;
        userToken ? header = {
            'Authorization': 'Token ' + userToken
        } : header = {}

        axios.post(`${ROOT_URL}/reservations/slots/`, {
            list: selectedDays
        }, {
            headers: header
        }
        ).then(function (response) {
                console.log(response);

        })
        .catch(function (error) {
                console.log(error);
        });
        console.log(selectedDays);
    };

    return (
        <View style={styles.container}>
            {days.map((day, index) => renderDay(day, index))}
            <Button mode='contained' onPress={handleSchedule} style={{marginVertical: 20}}>
                Update Schedule
            </Button>
        </View>
    );
};

export default ScheduleCreation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginVertical: 10,
        // backgroundColor: 'yellow',
    },
    daySwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayLabel: {
        fontSize: 16,
        marginLeft: 10,

    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: 'red',
    }
})
