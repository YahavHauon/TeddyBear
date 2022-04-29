import { useCallback, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../util/colors";
import { cardPropety } from "../util/strings";
import NotificationContext from "../store/notification-context";
import { screens, notificationStrings } from "../util/strings";

const Notification = ({ navigation }: any) => {
  const { notificationArray, notificationHasSeen } =
    useContext(NotificationContext);

  const toModal = (id: string) => {
    notificationHasSeen(id);
    navigation.navigate(screens.modalScreen, {
      imageArray: notificationArray.find((item) => item.id === id).imageArray,
    });
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            toModal(item.id);
          }}
        >
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>
              {notificationStrings.notificationTitle(item.name)}
            </Text>
            <Image style={styles.image} source={item.imageArray[0]} />
            {!item[cardPropety.hasSeen] ? (
              <View style={styles.hasSeen} />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    [notificationArray]
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={notificationArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Math.random()}
      />
      {notificationArray.length === 0 ? (
        <Text style={styles.noMore}>
          {notificationStrings.noNotificationsText}
        </Text>
      ) : null}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.notificationsBackground,
  },
  contentContainerStyle: { paddingBottom: 100 },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    left: 0,
    margin: 12,
    height: 50,
    width: 50,
  },
  hasSeen: {
    backgroundColor: colors.tinder,
    height: 8,
    width: 8,
    right: 20,
    position: "absolute",
    borderRadius: 100,
  },
  noMore: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 300,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
