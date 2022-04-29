import { useCallback, useContext, useState } from "react";
import { View, StyleSheet, Image, Pressable, Text, FlatList } from "react-native";
import { colors } from "../util/colors";
import { cardPropety } from "../util/strings";
import NotificationContext from "../store/notification-context";
import { screens } from "../util/strings";


const Notification = ({ navigation }: any) => {
    const { notificationArray, notificationHasSeen, hasReadNotication } = useContext(NotificationContext);
    const xHandler = () => {
        navigation.goBack();
    }
    const toModal = (id: number, flag: boolean) => {
        if (!flag) {
            hasReadNotication();
        }
        notificationHasSeen(id);
        navigation.navigate(screens.modalScreen, { imageArray: notificationArray[id].imageArray });
    }
    const renderItem = useCallback(({ item, index }) => {
        return (
            <Pressable style={({ pressed }) => pressed ? styles.pressed : null} onPress={() => { toModal(index, item[cardPropety.hasSeen]); }} >
                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationText}>You matched with {item.name}</Text>
                    <Image style={styles.image} source={item.imageArray[0]} />
                    {!item[cardPropety.hasSeen] ? <View style={styles.hasSeen} /> : null}
                </View>
            </Pressable>
        );
    }, [notificationArray]);

    return (
        <View style={styles.container}>
            <FlatList
                data={notificationArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            {notificationArray.length === 0 ? <Text style={styles.noMore}>You currently have no notifications</Text> : null}
        </View>
    );
}

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.notificationsBackground,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 60,
        borderColor: colors.backgroundColor,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        backgroundColor: colors.notificationBackground,
        marginTop: 10,
    },
    notificationText: {
        left: 75,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        position: 'absolute',
        left: 0,
        margin: 12,
        height: 50,
        width: 50,
    },
    pressed: {
        opacity: 0.75
    },
    hasSeen: {
        backgroundColor: colors.tinder,
        height: 8,
        width: 8,
        right: 20,
        position: 'absolute',
        borderRadius: 100,
    },
    hasSeenExplainer: {
        backgroundColor: colors.tinder,
        height: 8,
        width: 8,
        borderRadius: 100,
        marginLeft: 10,
    },
    explainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 20,
        width: 170,
        backgroundColor: colors.backgroundColor,

    },
    explainerText: {
        color: 'white',
    },
    noMore: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 300,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});