import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, Pressable } from 'react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';
import ChampionsContext from '../store/champions-context';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import NotificationContext from '../store/notification-context';
import { noMoreMatches, notification, screens } from '../util/strings';


const Swipe = () => {
    const navigation = useNavigation();
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const position = new Animated.ValueXY();
    const [currentIndex, setCurrentIndex] = useState(0);
    const { championList } = useContext(ChampionsContext);
    const { addNotification, hasReadNotication, notificationHasSeen, notificationArray } = useContext(NotificationContext);

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => {
                return {
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                };
            }
        });
    }, []);

    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate(screens.modalScreen, { imageArray: response.notification.request.content.data.imageArray });
        }
        );
        const foregroundSubscription = Notifications.addNotificationReceivedListener((notification: any) => {
            addNotification(notification.request.content.data.notificationData);
        })

        return () => {
            backgroundSubscription.remove();
            foregroundSubscription.remove();
        }
    }, []);

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

    const triggerNotificationHandler = (array: any) => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: notification.title,
                body: `You matched with ${array.name}`,
                data: { imageArray: array.imageArray, notificationData: array, name: array.name },
            },
            trigger: {

            }
        });
    };
    const xHandler = () => {
        setCurrentIndex(currentIndex + 1);
    }

    const matchHandler = () => {

        setCurrentIndex(currentIndex + 1);
        triggerNotificationHandler(championList[currentIndex]);
    }

    const likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 3],
        outputRange: [0.6, 0.6, 1],
        extrapolate: 'clamp'
    })

    const nopeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 3],
        outputRange: [1, 0.6, 0.6],
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

    const renderCards = useCallback(() => {
        return championList.map((item, i) => {
            if (i < currentIndex) {
                return null;
            } else if (i === currentIndex) {
                return (
                    <Animated.View
                        {...pan.panHandlers}
                        key={item.id}
                        style={
                            [rotateAndTranslate,
                                {
                                    height: SCREEN_HEIGHT - 70,
                                    width: SCREEN_WIDTH,
                                    padding: 10,
                                    position: 'absolute'
                                }]
                        }>
                        <ImageSlider id={i} data={championList} />
                        <Animated.View
                            style={{ ...styles.cardLabelContainer, opacity: likeOpacity }}
                        >
                            <Pressable onPress={matchHandler}>
                                <Image style={styles.heartIcon} source={require('../assets/heartIcon.png')} />
                            </Pressable>
                        </Animated.View>

                        <Animated.View
                            style={{ ...styles.cardLabelContainerRight, opacity: nopeOpacity }}
                        >
                            <Pressable onPress={xHandler}>
                                <Image style={styles.xIcon} source={require('../assets/Xicon.png')} />
                            </Pressable>
                        </Animated.View>


                    </Animated.View>
                );
            } else {
                return (
                    <Animated.View
                        key={i}
                        style={[{
                            opacity: nextCardOpacity,
                            transform: [{ scale: nextCardScale }],
                            height: SCREEN_HEIGHT - 70, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                        }]
                        }>
                        <ImageSlider id={i} data={championList} />
                    </Animated.View>
                );
            }
        }).reverse();
    }, [currentIndex, championList]);

    return (<>
        {renderCards()}
        {currentIndex === championList.length ? <View style={styles.noMoreContainer}>
            <Text style={styles.noMoreText}>{noMoreMatches.part1}</Text>
            <Text style={styles.noMoreText}>{noMoreMatches.part2}</Text>
        </View> : null}
    </>);
}

export default Swipe;
const styles = StyleSheet.create({
    card:
    {
        flex: 1,
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
