import React, { useEffect, useRef } from "react";
import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 5;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    elevation: 8,
    borderTopWidth: 0,
    height: 85,
    position: "relative",
  },
  indicator: {
    position: "absolute",
    bottom: 79,
    width: 80,
    left: -23,
    height: 6,
    backgroundColor: "black",
    borderRadius: 3,
  },
});

const tabScreens: {
  name: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}[] = [
  { name: "index", title: "Home", iconName: "home-outline" },
  { name: "explore", title: "Explore", iconName: "search-outline" },
  {
    name: "notifications",
    title: "Notification",
    iconName: "notifications-outline",
  },
  { name: "cart", title: "Cart", iconName: "cart-outline" },
  { name: "profile", title: "Profile", iconName: "person-outline" },
];

export default function TabLayout() {
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const moveIndicator = (index: number) => {
    Animated.timing(translateX, {
      toValue: index * TAB_WIDTH + TAB_WIDTH / 3.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {tabScreens.map((screen, index) => (
          <Tabs.Screen
            key={index}
            name={screen.name}
            options={{
              title: screen.title,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={
                    <Ionicons
                      name={screen.iconName}
                      size={30}
                      color={focused ? "black" : "gray"}
                    />
                  }
                />
              ),
            }}
            listeners={{
              focus: () => moveIndicator(index),
            }}
          />
        ))}
      </Tabs>
      <Animated.View
        style={[styles.indicator, { transform: [{ translateX }] }]}
      />
    </>
  );
}

const TabIcon: React.FC<{ icon: JSX.Element; focused: boolean }> = ({
  icon,
  focused,
}) => {
  return (
    <Animated.View style={{ opacity: focused ? 1 : 0.5 }}>{icon}</Animated.View>
  );
};
