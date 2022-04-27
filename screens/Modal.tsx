import { useState } from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { colors } from "../util/colors";
import { Ionicons } from '@expo/vector-icons';

const Modal = ({ route, navigation }) => {
    const imageArray = route.params.imageArray;
    const [imagePath, setImagePath] = useState(imageArray[0]);
    const [index, setIndex] = useState(0);

    navigation.setOptions({ headerLeft: () => <Pressable onPress={xHandler} style={styles.x}><Ionicons name="close-outline" size={30} color={colors.tinder} /></Pressable> });

    const xHandler = () => {
        navigation.goBack();
    }
    const imageSlider = (side: String) => {
        if (side === 'back') {
            if (index === 0) {
                setIndex(() => { setImagePath(imageArray[2]); return 2 });
            } else {
                setIndex((state) => { setImagePath(imageArray[state - 1]); return state - 1 });
            }
        }
        else {
            if (index === 2) {
                setIndex(() => { setImagePath(imageArray[0]); return 0 });
            } else {
                setIndex((state) => { setImagePath(imageArray[state + 1]); return state + 1 });
            }
        }
    }

    return (
        <View>
            <Image style={{ width: '100%', height: '100%' }} source={imagePath} />
            <View style={styles.indicator}>
                <Text style={styles.indicatorText}>{index + 1} out of 3</Text>
            </View>
            <Pressable onPress={() => { imageSlider('back') }} style={styles.backImage} />
            <Pressable onPress={() => { imageSlider('forward') }} style={styles.forwardImage} />
        </View>
    );
}

export default Modal;

const styles = StyleSheet.create({
    backImage: {
        position: 'absolute',
        height: '100%',
        width: '50%',
    },
    forwardImage: {
        right: 0,
        position: 'absolute',
        height: '100%',
        width: '50%',
    },
    indicator: {
        position: 'absolute',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 30,
        width: 170,
        backgroundColor: colors.backgroundColor,
        marginBottom: 50,
    },
    indicatorText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
    },
    x: {
        position: 'absolute'
    }
});