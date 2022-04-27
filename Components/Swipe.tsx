import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, Pressable, PermissionsAndroid } from 'react-native';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ImageSlider from './ImageSlider';
import ChampionsContext from '../store/champions-context';
import Toast from 'react-native-root-toast';
import { colors } from '../util/colors';

const Swipe = () => {
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const position = new Animated.ValueXY();

    const { championList, championListRendered } = useContext(ChampionsContext);

    useEffect(() => { })
    const pan = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > 120) {
                Animated.timing(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                    useNativeDriver: false, duration: 0
                }).start(() => {
                    matchHandler();
                    position.setValue({ x: 0, y: 0 });
                })
            } else if (gestureState.dx < -120) {
                Animated.timing(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    useNativeDriver: false, duration: 0
                }).start(() => {
                    setCurrentIndex(currentIndex + 1)
                    position.setValue({ x: 0, y: 0 });

                })
            }
            else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                    friction: 4
                }).start()
            }
        }
    });

    const xHandler = () => {
        setCurrentIndex(currentIndex + 1);
    }

    const matchHandler = () => {
        Toast.show('Its a MATCH', {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            backgroundColor: colors.tinder,
            opacity: 1,
            hideOnPress: true,
            delay: 0,
        });
        setCurrentIndex(currentIndex + 1)
    }

    const likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 3],
        outputRange: [1, 1, 0.2],
        extrapolate: 'clamp'
    })

    const nopeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 3],
        outputRange: [0.2, 1, 1],
        extrapolate: 'clamp'
    })

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    const rotateAndTranslate = {
        transform: [{
            rotate
        },
        ...position.getTranslateTransform()
        ]
    }

    const nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
    })

    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
    })

    return (<>
        {championListRendered}
        {/* <View style={styles.noMoreContainer}>
            <Text style={styles.noMoreText}>No more matches in your location</Text>
            <Text style={styles.noMoreText}> try again later</Text>
        </View> */}
    </>);
}

export default Swipe;
const styles = StyleSheet.create({
    card:
    {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
        borderRadius: 20,
        marginTop: 100,
    },
    cardLabelContainer: {
        position: "absolute",
        bottom: 0,
        left: 40,
        zIndex: 1000
    },
    cardLabelContainerRight: {
        position: "absolute",
        bottom: 0,
        right: 40,
        zIndex: 1000
    },
    cardText: {
        borderWidth: 1,
        borderColor: "green",
        color: "green",
        fontSize: 32,
        fontWeight: "800",
        padding: 10,
        marginTop: 100,
    },
    cardTextRight: {
        borderWidth: 1,
        borderColor: "red",
        color: "red",
        fontSize: 32,
        fontWeight: "800",
        padding: 10,
        marginTop: 100
    },
    xIcon: {
        position: 'absolute',
        width: 70,
        height: 70,
        bottom: 15,
        right: 220,
    },
    heartIcon: {
        position: 'absolute',
        width: 70,
        height: 70,
        bottom: 15,
        left: 220,
    },
    noMoreContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    noMoreText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
