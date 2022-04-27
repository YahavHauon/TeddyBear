import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, } from 'react';
import IconButton from './IconButton';
import { useNavigation } from '@react-navigation/native';


const ImageSlider = ({ data, id }) => {
    const [index, setIndex] = useState(0);
    const [imagePath, setImagePath] = useState(data[id].imageArray[0]);
    const [array, setArray] = useState([]);
    const navigation = useNavigation();

    const openPictureModal = () => {
        navigation.navigate('Modal', { imageArray: data[id].imageArray });
    }

    const imageSlider = (side: String, id: number) => {
        if (side === 'back') {
            if (index === 0) {
                setIndex(() => { setImagePath(data[id].imageArray[2]); return 2 });
            } else {
                setIndex((state) => { setImagePath(data[id].imageArray[state - 1]); return state - 1 });
            }
        }
        else {
            if (index === 2) {
                setIndex(() => { setImagePath(data[id].imageArray[0]); return 0 });
            } else {
                setIndex((state) => { setImagePath(data[id].imageArray[state + 1]); return state + 1 });
            }
        }
    }

    return <View key={id} style={styles.container} >

        <Image style={styles.image} source={imagePath} />
        <View style={styles.render}>
            <LinearGradient style={styles.renderGradient} colors={['transparent', 'black', 'black', 'black']} />
        </View>
        <View style={styles.imageCounterContainer}>
            <View style={index === 0 ? styles.imageCounterBlockOn : styles.imageCounterBlockOff}></View>
            <View style={index === 1 ? styles.imageCounterBlockOn : styles.imageCounterBlockOff}></View>
            <View style={index === 2 ? styles.imageCounterBlockOn : styles.imageCounterBlockOff}></View>
        </View>
        <View style={styles.textContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>{data[id].name}</Text>
                <Text style={styles.age}>{data[id].age}</Text>
            </View>
            <View style={styles.description}>
                {data[id].tags.map((tag: string) => {
                    return (
                        <View key={Math.random().toString()} style={styles.descriptionItem}>
                            <Text style={styles.descriptionText}>
                                {tag}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>

        <IconButton style={styles.leftArrow} name="arrow-back-circle" color="white" size={50} onPress={() => imageSlider('back', id)} />
        <Pressable style={styles.middleImage} onPress={openPictureModal} />
        <IconButton style={styles.rightArrow} name="arrow-forward-circle" color="white" size={50} onPress={() => imageSlider('forward', id)} />
    </View >;
}

export default ImageSlider;
const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    leftArrow: {
        marginTop: 110,
        position: 'absolute',
        top: '35%',
        opacity: 0.8
    },
    rightArrow: {
        marginTop: 110,
        position: 'absolute',
        right: 0,
        top: '35%',
        opacity: 0.8
    },
    pressed: {
        opacity: 0.75
    },
    imageCounterContainer: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    imageCounterBlockOn: {
        width: 80,
        height: 5,
        backgroundColor: 'lightgray',
        marginVertical: 120,
        marginHorizontal: 5,
    },
    imageCounterBlockOff: {
        width: 80,
        height: 5,
        backgroundColor: 'gray',
        marginVertical: 120,
        marginHorizontal: 5,
    },
    backImage: {
        position: 'absolute',
        height: '100%',
        width: '35%',
    },
    forwardImage: {
        right: 0,
        position: 'absolute',
        height: '100%',
        width: '35%',
    },
    middleImage: {
        alignSelf: 'center',
        position: 'absolute',
        height: '100%',
        width: '30%%',
    },
    descriptionItem: {
        backgroundColor: 'gray',
        padding: 8,
        borderRadius: 22,
        margin: 6,
    },
    descriptionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        flexWrap: "wrap",
        padding: 6,
        alignSelf: 'auto'
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 10,
    },
    age: {
        color: 'white',
        fontSize: 24,
        marginTop: 6,
        marginLeft: 10,
    },
    description: {
        flexDirection: 'row',
        marginBottom: 80,
    },
    render: {
        position: 'absolute',
        bottom: 0,
    },
    renderGradient: {
        height: 240,
        width: 395,
        overflow: 'hidden',
        borderRadius: 16,
    },
});
