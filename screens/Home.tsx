import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Swipe from "../Components/Swipe";
import ChampionsContext from "../store/champions-context";
import NotificationContext from "../store/notification-context";
import { colors } from "../util/colors";
import { screens } from "../util/strings";

const logo = require("../assets/logo.png");

const Home = ({ navigation }: any) => {
  const { championList } = useContext(ChampionsContext);
  const { unreadNotificationsExist } = useContext(NotificationContext);

  const notificationsHandler = () => {
    navigation.navigate(screens.notificationsScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolBar}>
        <Image style={styles.logo} source={logo} />
      </View>
      <StatusBar style="light" />
      {championList.length > 0 ? <Swipe /> : <AppLoading />}
      <Pressable style={styles.bell} onPress={notificationsHandler}>
        <Ionicons name="notifications" color={colors.tinder} size={30} />
        {!unreadNotificationsExist ? null : (
          <View style={styles.notifcations} />
        )}
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: colors.backgroundColor,
  },
  toolBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    marginTop: 20,
    alignSelf: "center",
    height: "80%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 16,
  },
  logo: {
    marginLeft: 110,
    resizeMode: "stretch",
    width: 185,
    height: 45,
  },
  bell: {
    position: "absolute",
    right: 0,
    top: 60,
    marginRight: 15,
  },
  endOfDeck: {
    alignSelf: "center",
    marginTop: 300,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignSelf: "center",
  },
  notifcations: {
    backgroundColor: colors.tinder,
    height: 8,
    width: 8,
    position: "absolute",
    right: 0,
    borderRadius: 100,
  },
});
