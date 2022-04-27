
import { createContext, useState, useEffect, useCallback } from "react";
import { Animated, Pressable, PanResponder, StyleSheet, Dimensions, Image } from 'react-native';
import { fetchData } from "../util/http";
import { colors } from "../util/colors";
import ImageSlider from "../Components/ImageSlider";
import Toast from 'react-native-root-toast';
const champions = [
    { id: 0, name: "Riven", imageArray: [require('../assets/riven1.png'), require('../assets/riven2.png'), require('../assets/riven3.png')] },
    { id: 1, name: "Akali", imageArray: [require('../assets/akali1.png'), require('../assets/akali2.png'), require('../assets/akali3.png')] },
    { id: 2, name: "Annie", imageArray: [require('../assets/annie1.png'), require('../assets/annie2.png'), require('../assets/annie3.png')] },
    { id: 3, name: "Draven", imageArray: [require('../assets/draven1.png'), require('../assets/draven2.png'), require('../assets/draven3.png')] },
    { id: 4, name: "Syndra", imageArray: [require('../assets/syndra1.png'), require('../assets/syndra2.png'), require('../assets/syndra3.png')] },
    { id: 5, name: "Taric", imageArray: [require('../assets/taric1.png'), require('../assets/taric2.png'), require('../assets/taric3.png')] },
    { id: 6, name: "Ahri", imageArray: [require('../assets/ahri1.png'), require('../assets/ahri2.png'), require('../assets/ahri3.png')] },
    { id: 7, name: "Caitlyn", imageArray: [require('../assets/caitlyn1.png'), require('../assets/caitlyn2.png'), require('../assets/caitlyn3.png')] },
];
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const position = new Animated.ValueXY();
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


export const ChampionsContext = createContext<{
    championList: any[],
    fetchChampionData: () => void,
    isLoading: boolean,
    championListRendered: any[],
}>({
    championList: [],
    fetchChampionData: () => { },
    isLoading: false,
    championListRendered: []
});

const ChampionsContextProvider = ({ children }) => {
    const [championList, setChampionList] = useState<any[]>([]);
    const [championListRendered, setChampionListRendered] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (championList.length === 0) {
            fetchChampionData();
        } else {
            setChampionListRendered(renderCards());
        }
    }, [championList]);




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

    const randomAttribute = () => {
        let randomArrayOfAttributes = ['Aoe clear', 'Engager', 'TopLaner', 'Low cd', 'MidLaner', 'Jungler', 'Good Ult', 'Support'];
        let currentArrayOfAttributes: string[] = [];
        let rnd = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        for (let i = 0; i < rnd; i++) {
            let randomIndex = Math.floor(Math.random() * (randomArrayOfAttributes.length));
            let temp: string = randomArrayOfAttributes[randomIndex];
            if (currentArrayOfAttributes.includes(temp)) {
                rnd++;
            } else {
                currentArrayOfAttributes.push(temp);
            }
        }
        return currentArrayOfAttributes;
    }

    const addDataToList = () => {
        champions.forEach((item: any) => {
            item["tags"] = randomAttribute();
            item["age"] = Math.floor(Math.random() * (60 - 20 + 1) + 20);
        })
        setChampionList(champions);
    }

    const fetchChampionData = async () => {

        let result: any;
        try {
            result = await fetchData();
            addDataToList();
        } catch (error) {
            console.log(error);
            return;
        }
    }


    return (
        <ChampionsContext.Provider value={{
            championList,
            fetchChampionData,
            isLoading,
            championListRendered
        }}>
            {children}
        </ChampionsContext.Provider>
    );
};

export { ChampionsContextProvider };
export default ChampionsContext;

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
});
