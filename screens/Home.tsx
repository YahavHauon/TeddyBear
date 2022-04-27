import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../util/colors';
import ChampionsContext from '../store/champions-context';
import { useContext, useEffect } from 'react';
import Swipe from '../Components/Swipe';

const Home = () => {

    const { fetchChampionData, championList, championListRendered } = useContext(ChampionsContext);

    return (
        <View style={styles.container} >
            <View style={styles.toolBar}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <View style={styles.bell}>
                    <Ionicons name="notifications" color={colors.tinder} size={30} />
                </View>
            </View>
            <StatusBar style='light' />
            {championListRendered.length > 0 ? <Swipe /> : <ActivityIndicator style={styles.indicator} size="large" />}
            <SafeAreaView>
            </SafeAreaView>
        </View >
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        backgroundColor: colors.backgroundColor,
    },
    toolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        marginTop: 20,
        alignSelf: 'center',
        height: '80%',
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 16,
    },
    logo: {
        marginLeft: 110,
        resizeMode: 'stretch',
        width: 185,
        height: 45,
    },
    bell: {
        marginTop: 5,
        marginRight: 15,
    },
    endOfDeck: {
        alignSelf: 'center',
        marginTop: 300,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignSelf: 'center'
    }
});
