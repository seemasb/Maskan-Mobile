import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton, Snackbar } from 'react-native-paper';

const ScheduleTour = ({ showSnackBar, hideDialog }) => {
    const [selectedDay, setSelectedDay] = useState('MON');
    const [selectedTime, setSelectedTime] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [scheduleData, setScheduleData] = useState();
    const [ScheduleTimeSlots, setScheduleTimeSlots] = useState();
    const [daysTest, setDaysTest] = useState();

    ROOT_URL = "http://18.198.203.6:8000";
    const [Events, setEvent] = useState(null)
    const testData = [
        {
            "id": 32,
            "home": 2,
            "reserved_by": 2,
            "start_time": 14,
            "end_time": 15,
            "date": "2023-05-17",
            "user": 2,
            "year": 2023,
            "month": 5,
            "day": "WED",
            "phone_number": "tel:+970-597-292-545",
            "username": "seema_sbouh",
            "email": "seema.sbouh512@gmail.com",
            "dayNum": 17
        },
        {
            "id": 35,
            "home": null,
            "reserved_by": null,
            "start_time": 5,
            "end_time": 6,
            "date": "2023-05-17",
            "user": 2,
            "year": 2023,
            "month": 5,
            "day": "WED",
            "phone_number": "tel:+970-597-292-545",
            "username": "seema_sbouh",
            "email": "seema.sbouh512@gmail.com",
            "dayNum": 17
        },
        {
            "id": 28,
            "home": null,
            "reserved_by": null,
            "start_time": 9,
            "end_time": 10,
            "date": "2023-05-19",
            "user": 2,
            "year": 2023,
            "month": 5,
            "day": "FRI",
            "phone_number": "tel:+970-597-292-545",
            "username": "seema_sbouh",
            "email": "seema.sbouh512@gmail.com",
            "dayNum": 19
        },
        {
            "id": 29,
            "home": null,
            "reserved_by": null,
            "start_time": 10,
            "end_time": 11,
            "date": "2023-05-19",
            "user": 2,
            "year": 2023,
            "month": 5,
            "day": "FRI",
            "phone_number": "tel:+970-597-292-545",
            "username": "seema_sbouh",
            "email": "seema.sbouh512@gmail.com",
            "dayNum": 19
        },
        {
            "id": 24,
            "home": null,
            "reserved_by": null,
            "start_time": 10,
            "end_time": 11,
            "date": "2023-05-21",
            "user": 2,
            "year": 2023,
            "month": 5,
            "day": "SUN",
            "phone_number": "tel:+970-597-292-545",
            "username": "seema_sbouh",
            "email": "seema.sbouh512@gmail.com",
            "dayNum": 21
        }]

    useEffect(() => {
        //get 
        async function updateFreeTimes() {
            // try {
            //     const userToken = await AsyncStorage.getItem('token');
            //     let header = {};
            //     if (userToken) {
            //         header = { 'Authorization': 'Token ' + 'f252f5f4fdece6fd808a13e1dc42d29eec0adb3e' };
            //     }
            //     const res = await axios.get(`${ROOT_URL}/reservations/slots/`, { headers: header });
            //     console.log(res.data)

            let events = {};
            testData.forEach(item => {
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
            // setEvent(events)
            console.log(events)
            setScheduleData(events)
            // Convert the object keys into an array
            setDaysTest(Object.keys(events));

            // } catch (error) {
            //     console.log(error);
            // }
        }
        updateFreeTimes()

    }, [])

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
        setScheduleTimeSlots(scheduleData[selectedDay] || []);

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
                    {daysTest ? daysTest.map((day) => (
                        <Button
                            key={day}
                            mode="contained"
                            onPress={() => handleDayClick(day)}
                            style={selectedDay == day ? styles.selectedDayButton : styles.DayButton}
                            // style={selectedDay == day && styles.selectedDayButton}
                            labelStyle={[styles.dayButtonLabel, selectedDay == day ? styles.selectedDayButtonLabel : styles.dayButtonLabel]}
                        >
                            {/* <View style={styles.column}> */}
                            <Text >{day}</Text>
                            {/* <Text>-</Text>
                            <Text >{day.date}</Text> */}
                            {/* </View> */}
                        </Button>
                    )) : <></>}

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
                    {/* <View style={styles.TimeContainer}>
                        {selectedDay &&
                            scheduleData.map((time) => (
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
                    </View> */}


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



                        {/* <View style={styles.TimeContainer}>
                            {selectedDay &&
                                scheduleData.map((time) => (
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
                        </View> */}
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