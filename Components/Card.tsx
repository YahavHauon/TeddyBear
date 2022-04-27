import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ImageSlider from './ImageSlider';
import { useEffect, useState } from 'react';


const Card = ({ card, number, array }) => {


    return <View style={styles.card} >
        <ImageSlider />
        <View style={styles.render}>
            <LinearGradient style={styles.renderGradient} colors={['transparent', 'black', 'black', 'black']} />
        </View>
        <View style={styles.textContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Riven</Text>
                <Text style={styles.age}>{number}</Text>
            </View>
            <View style={styles.description}>
                {array.map((item) => {
                    return (
                        <View style={styles.descriptionItem}>
                            <Text key={Math.random().toString()} style={styles.descriptionText}>
                                {item}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    </View>;
}

export default Card;
const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        alignSelf: 'center',
        height: '80%',
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 17,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    render: {
        position: 'absolute',
        bottom: 0,
    },
    renderGradient: {
        height: 240,
        width: 393,
        overflow: 'hidden',
        borderRadius: 16,

    },
    textContainer: {
        position: 'absolute',
        bottom: 90,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    age: {
        color: 'white',
        fontSize: 24,
        marginTop: 6,
        marginLeft: 10,
    },
    description: {
        flexWrap: "wrap",
        flexDirection: 'row',
        marginTop: 8,
    },
    descriptionItem: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 25,
        margin: 6,
    },
    descriptionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    }
});
