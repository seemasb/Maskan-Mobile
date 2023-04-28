import { Agenda } from 'react-native-calendars';
import { View, Text } from 'react-native';

function Calendar() {
    return (
        <Agenda
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={{
                '2023-05-22': [{ title: 'item 1 - any js object', time: '12:00AM - 1:00PM' }],
                '2023-05-23': [{ title: 'item 2 - any js object', time: '12:00AM - 1:00PM' }],
                '2023-05-25': [{ title: 'item 3 - any js object', time: '12:00AM - 1:00PM' }, { title: 'any js object', time: '12:00AM - 1:00PM' }, { title: 'any js object', time: '12:00AM - 1:00PM' }]
            }}
            // Initially selected day
            selected={'2023-05-16'}
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
                return <View>
                    <Text>
                        {item.title}
                    </Text>
                </View>;
            }}

            renderEmptyDate={() => {
                return <View> <Text>No data found</Text></View>;
            }}

            // Specify what should be rendered instead of ActivityIndicator
            renderEmptyData={() => {
                return (<View><Text>No data found</Text></View>);
            }}

            // Hide knob button. Default = false
            hideKnob={false}
            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
            showClosingKnob={true}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={{
                '2023-05-16': { selected: true, marked: true },
                '2023-05-17': { marked: true },
                '2023-05-18': { disabled: true, marked: true }
            }}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            disabledByDefault={true}
            // Agenda theme
            // theme={{
            //     agendaDayTextColor: 'yellow',
            //     agendaDayNumColor: 'green',
            //     agendaTodayColor: 'red',
            //     agendaKnobColor: 'blue'
            // }}
            // Agenda container style
            style={{}}
        />
    );
}

export default Calendar;