import { Agenda } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Calendar() {
    ROOT_URL = "http://18.198.203.6:8000";
    const [Events, setEvent] = useState(null)

    useEffect(() => {
        //get 
        async function updateFreeTimes() {
            try {
                const userToken = await AsyncStorage.getItem('token');
                let header = {};
                if (userToken) {
                    header = { 'Authorization': 'Token ' + 'f252f5f4fdece6fd808a13e1dc42d29eec0adb3e' };
                }
                const res = await axios.get(`${ROOT_URL}/reservations/slots/`, { headers: header });
                console.log(res.data)

                let events = {};
                res.data.forEach(item => {
                    const { date, home, start_time, end_time, reserved_by, username , email , phone_number } = item;
                    const eventDate = date;

                    if (!events[eventDate]) {
                        events[eventDate] = [];
                    }

                    events[eventDate].push({
                        title: `Home ${home}`,
                        time: `${start_time}:00AM - ${end_time}:00PM`,
                        ReservedBy: username,
                        email: email , 
                        phone_number: phone_number

                    });
                });
                setEvent(events)

            } catch (error) {
                console.log(error);
            }
        }
        updateFreeTimes()

    }, [])





    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    date = currentYear + currentMonth + currentDay
  

    let marked = {}
    for (const key in Events) {
        marked[key] = {
            marked: true
        }
    }
    return (
        <Agenda
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={Events ? Events : <></>}

            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2022-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2024-05-30'}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}

            // Specify how each item should be rendered in agenda
            renderItem={(item) => {
                return (
                    <View style={Styles.CalendarElement}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#45729d', marginBottom: 10 }}>
                                {item.title}
                            </Text >
                            <Text style={{ fontSize: 16, color: 'gray', marginBottom: 5 }}>
                                {item.time}
                            </Text>
                            <Text>
                                <Text style={{ color: 'gray' }}>Resereved By: </Text>
                                {item.ReservedBy}
                            </Text>
                            <Text>
                                <Text style={{ color: 'gray' }}>Email: </Text>
                                {item.email}
                            </Text>
                            <Text>
                                <Text style={{ color: 'gray' }}>Phone Number: </Text>
                                {item.phone_number.split(":")[1]}
                            </Text>
                    </View >

                )
            }}

            renderEmptyDate={() => {
                return <View> <Text >No data found</Text></View>;
            }}

            // Specify what should be rendered instead of ActivityIndicator
            renderEmptyData={() => {
                return (
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', rowGap: 30 }}>
                        <FontAwesome name="calendar-check-o" size={150} color="lightgray" />
                        <Text style={{ fontSize: 25, color: 'lightgray' }}>No Events found</Text>
                    </View>);
            }}

            // Hide knob button. Default = false
            hideKnob={false}
            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
            showClosingKnob={true}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={marked}

            // Initially selected day
            selectedDay={date}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            disabledByDefault={true}
            // Agenda theme
            // theme={{
            //     agendaDayTextColor: 'red',
            //     agendaDayNumColor: 'green',
            //     agendaTodayColor: 'red',
            //     agendaKnobColor: 'red'
            // }}
            // Agenda container style
            style={{}}
        />
    );
}

export default Calendar;

const Styles = StyleSheet.create({
    CalendarElement: {
        backgroundColor: 'white',
        // borderColor: 'lightgray',
        // borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 13,

    }
})