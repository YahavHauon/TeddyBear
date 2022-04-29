import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Modal from "./screens/Modal";
import { colors } from "./util/colors";
import Notification from "./screens/Notification";
import { screens } from "./util/strings";
import { NotificationContextProvider } from "./store/notification-context";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <NotificationContextProvider>
        <>
          <Stack.Navigator>
            <Stack.Screen
              name={screens.homeScreen}
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screens.modalScreen}
              component={Modal}
              options={{
                title: screens.modalTitle,
                presentation: "modal",
                headerTintColor: colors.tinder,
                headerStyle: { backgroundColor: colors.backgroundColor },
              }}
            />
            <Stack.Screen
              name={screens.notificationsScreen}
              component={Notification}
              options={{
                title: screens.notificationsTitle,
                headerTintColor: colors.tinder,
                headerStyle: { backgroundColor: colors.backgroundColor },
              }}
            />
          </Stack.Navigator>
        </>
      </NotificationContextProvider>
    </NavigationContainer>
  );
};

export default Navigation;
