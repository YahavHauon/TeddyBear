import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Premissions from "expo-permissions";
import { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  asyncStorageTags,
  notificationStrings,
  screens,
} from "../util/strings";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

export const NotificationContext = createContext<{
  notificationArray: any[];
  addNotification: (notification: any) => void;
  notificationHasSeen: (id: string) => void;
  triggerNotificationHandler: (champion: any) => void;
  unreadNotificationsExist: boolean;
}>({
  notificationArray: [],
  unreadNotificationsExist: false,
  addNotification: () => {},
  triggerNotificationHandler: () => {},
  notificationHasSeen: () => {},
});

const NotificationContextProvider = ({ children }: any) => {
  const [notificationArray, setNotificationArray] = useState<any[]>([]);
  const navigation = useNavigation();

  const [unreadNotificationsExist, setUnreadNotificationsExist] =
    useState<boolean>(false);

  useEffect(() => {
    Premissions.getAsync(Premissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj?.status !== "granted") {
          return Premissions.askAsync(Premissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj?.status === "granted") {
          return;
        }
      });
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldSetBadge: true,
          shouldPlaySound: true,
        };
      },
    });
  }, []);

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        notificationHasSeen(
          response.notification.request.content.data.notificationData.id
        );
        navigation.navigate(screens.modalScreen, {
          imageArray: response.notification.request.content.data.imageArray,
        });
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification: any) => {
        addNotification(notification.request.content.data.notificationData);
      });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  useEffect(() => {
    fetchNotify();
  }, []);

  useEffect(() => {
    storeNotify();

    setUnreadNotificationsExist(
      notificationArray.filter((item) => !item.hasSeen).length > 0
    );
  }, [notificationArray]);

  const triggerNotificationHandler = (champion: any) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: notificationStrings.triggeredNotificationTitle,
        body: notificationStrings.notificationTitle(champion.name),
        data: {
          imageArray: champion.imageArray,
          notificationData: champion,
          name: champion.name,
        },
      },
      trigger: {},
    });
  };

  const storeNotify = async () => {
    let newArray = JSON.stringify(notificationArray);
    try {
      await AsyncStorage.setItem(asyncStorageTags.notifyArray, newArray);
    } catch (e) {
      // saving error
    }
  };

  const fetchNotify = async () => {
    try {
      let temp = await AsyncStorage.getItem(asyncStorageTags.notifyArray);

      if (temp) {
        let newArray = JSON.parse(temp);
        console.log(newArray.length);

        setNotificationArray(newArray);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addNotification = (notification: any) => {
    setNotificationArray((notificationArray) => [
      notification,
      ...notificationArray,
    ]);
  };

  const notificationHasSeen = (id: string) => {
    let newArray = [...notificationArray];
    newArray.find((item) => item.id === id && !item.hasSeen)["hasSeen"] = true;
    setNotificationArray(newArray);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationArray,
        unreadNotificationsExist,
        triggerNotificationHandler,
        addNotification,
        notificationHasSeen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContextProvider };
export default NotificationContext;
