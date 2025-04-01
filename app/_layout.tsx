import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CartProvider } from "../app/CartContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <CartProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ presentation: "modal" }} />
            <Stack.Screen name="signup" options={{ presentation: "modal" }} />
            <Stack.Screen
              name="LikeProduct"
              options={{ presentation: "modal" }}
            />
          </Stack>
        </CartProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
