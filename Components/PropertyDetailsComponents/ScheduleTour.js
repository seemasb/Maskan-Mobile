import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton, Snackbar } from 'react-native-paper';
import ROOT_URL from '../ProfileComponents/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MultipleSelectList } from "react-native-dropdown-select-list";
import axios from 'axios';
const ScheduleTour = ({ showSnackBar, hideDialog, property_owner_id, property_id }) => {
    const [selectedDay, setSelectedDay] = useState('MON');
    const [selectedTime, setSelectedTime] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [scheduleData, setScheduleData] = useState();
    const [ScheduleTimeSlots, setScheduleTimeSlots] = useState();
    const [days, setDays] = useState();

    const [Events, setEvent] = useState(null)
    const [slotsData, setSlotsData] = useState([]);


    useEffect(() => {
        async function updateFreeTimes() {
            try {
                const userToken = await AsyncStorage.getItem('token');
                let header = {};
                if (userToken) {
                    header = { 'Authorization': 'Token ' + userToken };
                }
                const response = await axios.get(`${ROOT_URL}/reservations/short_slots/`,{params: {
                    property_owner_id: property_owner_id,  
                  }} ,{ headers: header });

                setSlotsData(response.data)
            }catch(error){
                console.error(error);
            }
            
            let events = {};
            slotsData.forEach(item => {
                const { id, date, home, start_time, end_time, day, dayNum } = item;
                const eventDate = day + '-' + dayNum

                if (!events[eventDate]) {
                    events[eventDate] = [];
                }

                events[eventDate].push({
                    day: day,
                    start_time: start_time,
                    end_time: end_time,
                    id: id,
                    home: home
                });
            });
            setEvent(events)
            setScheduleData(events)
            setDays(Object.keys(events));
        }
        updateFreeTimes()

    }, [])

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSelectedTime(null);
        setScheduleTimeSlots(scheduleData[selectedDay] || []);

    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleScheduleClick = async (slot_id,home_id) => {
        try {
            const userToken = await AsyncStorage.getItem('token');
            let header = {};
            if (userToken) {
                if(selectedTime){
                    header = { 'Authorization': 'Token ' + userToken };
                    const res = await axios.patch(
                        `${ROOT_URL}/reservations/reserve/${selectedTime}/`,
                        {
                            home: property_id
                        },
                        {
                            headers: header
                        }
                    );
                }
                else{
                    console.log("select slot before");
                }
            }
            else{

                console.log("should log-in");
            }
            
        }catch(error){
            console.error(error);
        }

        showSnackBar();
        hideDialog();
        setShowSnackbar(true);
    };
    const daysRen = (days) => {
        return days.map((day) => (
            <Button
            key={day}
            mode="contained"
            onPress={() => handleDayClick(day)}
            style={selectedDay == day ? styles.selectedDayButton : styles.DayButton}
            labelStyle={[styles.dayButtonLabel, selectedDay == day ? styles.selectedDayButtonLabel : styles.dayButtonLabel]}
            >
                <Text>{day}</Text>
            </Button>
        ));
    };


    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.buttonContainer}>
                    {days ? daysRen(days) : <Text>Loading...</Text>}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
                {
                    selectedDay &&
                    <IconButton icon="chevron-left" color="#45729d" />
                }
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.TimeContainer}>
                        {selectedDay && ScheduleTimeSlots ?
                            ScheduleTimeSlots.map((time) => (
                                <Button
                                    key={time.id}
                                    mode="contained"
                                    onPress={() => handleTimeClick(time.id)}
                                    style={[
                                        styles.timeButton,
                                        selectedTime == time.id ? styles.selectedTimeButton : styles.timeButton
                                    ]}
                                    labelStyle={[
                                        styles.timeButtonLabel,
                                        selectedTime == time.id
                                            ? styles.selectedTimeButtonLabel
                                            : styles.timeButtonLabel
                                    ]}
                                >
                                    {time.start_time} - {time.end_time}
                                </Button>
                            )) : <></>}

                    </View>
                </ScrollView>
                {
                    selectedDay &&
                    <IconButton icon="chevron-right" color="#45729d" />
                }
            </View>
            <Button
                mode="contained"
                onPress={handleScheduleClick}
                style={styles.scheduleButton}
                icon="calendar"
            >
                Schedule
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        rowGap: 15,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        columnGap: 10,
    },
    TimeContainer: {
        flexDirection: 'row',
        columnGap: 10,

    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyCntent: 'center',
    },
    selectedDayButton: {
        backgroundColor: '#45729d',
        height: 45,
        borderRadius: 13,
    },
    DayButton: {
        backgroundColor: '#fff',
        borderColor: '#45729d',
        borderWidth: 2,
        height: 45,
        borderRadius: 13,
    },
    dayButtonLabel: {
        color: '#45729d',
    },
    selectedDayButtonLabel: {
        color: '#fff',
    },
    timeButton: {
        backgroundColor: '#fff',
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
    },
    selectedTimeButton: {
        backgroundColor: '#45729d',
        height: 45,
    },
    timeButtonLabel: {
        color: '#45729d',
        fontSize: 15
    },
    selectedTimeButtonLabel: {
        color: '#fff',
    },
    scheduleButton: {
        backgroundColor: '#45729d',
        borderRadius: 13,
    },

});

export default ScheduleTour;