import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import C1 from '../../assets/pool_1.jpg'
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');
const itemWidth = width * 0.7;
const itemHeight = height * 0.5;

const data = [
    { id: 1, image: C1 },
    { id: 2, image: C1 },
    { id: 3, image: C1 },
];

const Gallary = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [scale, setScale] = useState(1);

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale } }],
        { useNativeDriver: true }
    );

    const onPinchHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setScale(scale => {
                if (scale < 1) {
                    return 1;
                }
                return scale;
            });
        }
    };

    const renderItem = ({ item }) => (
        <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onPinchHandlerStateChange}
        >
            <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
                <Image source={item.image} style={styles.itemImage} />
            </Animated.View>
        </PinchGestureHandler>
    );



    //   const renderItem = ({ item }) => (
    //     <View style={styles.itemContainer}>
    //       <Image source={item.image} style={styles.itemImage} />
    //     </View>
    //   );

    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                onSnapToItem={(index) => setActiveSlide(index)}
                initialScrollIndex={1}
            />
            {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 220,
        // height: '38%',
        // backgroundColor: 'blue',
        // marginTop: 15,
    },
    itemContainer: {
        // width: itemWidth,
        // height: itemHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    paginationContainer: {
        paddingVertical: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#45729d',
    },
    paginationInactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#8E8E93',
    },
});

export default Gallary;
