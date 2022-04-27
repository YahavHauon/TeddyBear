import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Modal from "./screens/Modal";
import { colors } from "./util/colors";

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Modal" component={Modal} options={{ title: 'Pictures', presentation: 'modal', headerTintColor: colors.tinder, headerStyle: { backgroundColor: colors.backgroundColor } }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;