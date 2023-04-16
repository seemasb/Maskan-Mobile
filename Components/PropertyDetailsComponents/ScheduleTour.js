import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton, Snackbar } from 'react-native-paper';

const ScheduleTour = ({showSnackBar , hideDialog}) => {
    const [selectedDay, setSelectedDay] = useState('MON');
    const [selectedTime, setSelectedTime] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const days = [
        { day: 'MON', date: '14' },
        { day: 'TUE', date: '15' },
        { day: 'WED', date: '16' },
        { day: 'THU', date: '17' },
        { day: 'FRI', date: '18' },
        { day: 'SAT', date: '19' },
        { day: 'SUN', date: '20' },
    ];

    const timeSlots = [
        { time: '10:00 - 11:00 AM' },
        { time: '11:00 AM' },
        { time: '12:00 PM' },
        { time: '1:00 PM' },
        { time: '2:00 PM' },
        { time: '3:00 PM' },
        { time: '4:00 PM' },
        { time: '5:00 PM' },
    ];

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleScheduleClick = () => {
        showSnackBar();
        hideDialog();
        setShowSnackbar(true);
    };

    return (
        <View style={styles.container}>
            {/* <View style={{ flexDirection: 'row' }}>

                <IconButton icon="chevron-left" color="#45729d" /> */}

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.buttonContainer}>
                        {days.map((day) => (
                            <Button
                                key={day.day}
                                mode="contained"
                                onPress={() => handleDayClick(day.day)}
                                style={selectedDay == day.day ? styles.selectedDayButton : styles.DayButton}
                                // style={selectedDay == day && styles.selectedDayButton}
                                labelStyle={[styles.dayButtonLabel, selectedDay == day.day ? styles.selectedDayButtonLabel : styles.dayButtonLabel]}
                            >
                                {/* <View style={styles.column}> */}
                                <Text >{day.day}</Text>
                                <Text>-</Text>
                                <Text >{day.date}</Text>
                                {/* </View> */}
                            </Button>
                        ))}
                        {/* <IconButton icon="chevron-right" color="#45729d" /> */}
                    </View>
                </ScrollView>
                {/* <IconButton icon="chevron-right" color="#45729d" />
            </View> */}
            <View style={{ flexDirection: 'row' }}>
                {
                    selectedDay &&
                    <IconButton icon="chevron-left" color="#45729d" />
                }
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.TimeContainer}>
                        {selectedDay &&
                            timeSlots.map((time) => (
                                <Button
                                    key={time.time}
                                    mode="contained"
                                    onPress={() => handleTimeClick(time.time)}
                                    style={[styles.timeButton, selectedTime == time.time ? styles.selectedTimeButton : styles.timeButton]}
                                    labelStyle={[styles.timeButtonLabel, selectedTime == time.time ? styles.selectedTimeButtonLabel : styles.timeButtonLabel]}
                                >
                                    {time.time}
                                </Button>
                            ))}
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
            {/* <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)} style={styles.snackbar}>
                Tour scheduled successfully!
            </Snackbar> */}
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