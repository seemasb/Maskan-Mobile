import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Modal, Image, TouchableOpacity, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import C1 from '../../assets/pool_1.jpg'
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');
const itemWidth = width * 0.7;
const itemHeight = height * 0.5;

/*
const Gallary = ({propertyDetails}) => {
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
    imagesList = []
    propertyDetails.images.map((item)=>{
        imagesList.push({
            id:item.id,
            image : {uri:item.image}
        })
    })
    return (
        <View style={styles.container}>
            <Carousel
                data={imagesList} 
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                onSnapToItem={(index) => setActiveSlide(index)}
                // initialScrollIndex={1}
            />
        </View>
    );
};*/
const Gallary = ({ propertyDetails }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [scale, setScale] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale } }],
      { useNativeDriver: true }
    );
  
    const onPinchHandlerStateChange = (event) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        setScale((scale) => {
          if (scale < 1) {
            return 1;
          }
          return scale;
        });
      }
    };
    const imagesList = propertyDetails.images.map((item) => ({
        id: item.id,
        image: { uri: item.image },
    }));
  
    const handleImagePress = (index) => {
      const image = imagesList[index].image;
      setSelectedImage(image);
    };
  
    const handleCloseModal = () => {
      setSelectedImage(null);
    };
  
    const renderItem = ({ item, index }) => (
      <TouchableOpacity onPress={() => handleImagePress(index)}>
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
            <Image source={item.image} style={styles.itemImage} />
          </Animated.View>
        </PinchGestureHandler>
      </TouchableOpacity>
    );
  
    
  
    return (
      <View style={styles.container}>
        <Carousel
          data={imagesList}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Modal visible={selectedImage !== null} transparent={true} onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Image source={selectedImage} style={styles.fullScreenImage} resizeMode="contain" />
          </View>
        </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        // flex: 1,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        // resizeMode: 'cover',
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    fullScreenImage: {
        width: '90%',
        height: '90%',
  },
});

export default Gallary;
