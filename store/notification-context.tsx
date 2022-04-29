
import { createContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Image } from 'react-native';
import * as Premissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncStorageTags, cardPropety } from "../util/strings";

export const NotificationContext = createContext<{
    notificationArray: any[],
    unreadNotications: number,
    addNotification: (notification: any) => void,
    notificationHasSeen: (id: number) => void,
    hasReadNotication: () => void,

}>({
    notificationArray: [],
    unreadNotications: 0,
    addNotification: () => { },
    notificationHasSeen: () => { },
    hasReadNotication: () => { }
});

const NotificationContextProvider = ({ children }) => {
    const [notificationArray, setNotificationArray] = useState<any[]>([]);
    const [unreadNotications, setUnreadNotications] = useState(0);

    useEffect(() => {
        Premissions.getAsync(Premissions.NOTIFICATIONS).then((statusObj) => {
            if (statusObj?.status !== 'granted') {
                return Premissions.askAsync(Premissions.NOTIFICATIONS);
            }
            return statusObj;
        }).then((statusObj) => {
            if (statusObj?.status === 'granted') {
                return;
            }
        });
    }, []);


    useEffect(() => {
        fetchNotify();
    }, []);
    useEffect(() => {
        storeNotify();
    }, [notificationArray, unreadNotications]);

    const storeNotify = async () => {
        let newArray = JSON.stringify(notificationArray);
        let num = JSON.stringify(unreadNotications);
        try {
            await AsyncStorage.setItem(asyncStorageTags.notifyArray, newArray)
            await AsyncStorage.setItem(asyncStorageTags.unReadMsgs, num)
        } catch (e) {
            // saving error
        }
    }

    const fetchNotify = async () => {

        try {
            let temp = await AsyncStorage.getItem(asyncStorageTags.notifyArray)
            let tempNum = await AsyncStorage.getItem(asyncStorageTags.unReadMsgs)
            if (temp) {
                let newArray = JSON.parse(temp);
                setNotificationArray(newArray);
            }
            setUnreadNotications(tempNum ? JSON.parse(tempNum) : 0);
        } catch (e) {
            console.log(e);
        }
    }
    const addNotification = (notification: any) => {
        setNotificationArray((notificationArray) => [notification, ...notificationArray]);
        setUnreadNotications((unreadNotications) => unreadNotications + 1);
    }

    const notificationHasSeen = (id: number) => {
        let newArray = [...notificationArray];
        newArray[id]['hasSeen'] = true;
        setNotificationArray(newArray);
    }

    const hasReadNotication = () => {
        setUnreadNotications((unreadNotications) => unreadNotications - 1);
    }
    return (
        <NotificationContext.Provider value={{
            notificationArray,
            addNotification,
            notificationHasSeen,
            hasReadNotication,
            unreadNotications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContextProvider };
export default NotificationContext;

const styles = StyleSheet.create({

});
