import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Actions for useReducer
const ADD_LIKE = "ADD_LIKE";

const likeReducer = (
  state: number,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case ADD_LIKE:
      return state + 1;
    default:
      return state;
  }
};

const Header = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [likes, dispatch] = useReducer(likeReducer, 0);
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [badgeAnimation] = useState(new Animated.Value(0));

  const startBadgeAnimation = () => {
    Animated.timing(badgeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(() => badgeAnimation.setValue(0));
  };

  const handleLikePress = () => {
    dispatch({ type: ADD_LIKE });
    startBadgeAnimation();
  };

  const handleLogout = async () => {
    try {
      // Clear all stored data
      await AsyncStorage.multiRemove([
        "userToken",
        "userData",
        "cartItems",
        "likedItems",
      ]);

      // Navigate to welcome screen
      router.replace("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.logo}>SJ</Text>

      <Link href="/explore" asChild>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={20} color={Colors.gray} />
          <Text style={styles.searchTxt}>Explore Products</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/message" asChild>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={Colors.primary}
          />
          {unreadMessages > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{unreadMessages}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
      <View style={styles.iconsContainer}>
        {/* Like Button wrapped in a Link to navigate to /likeproduct */}
        <Link href="/LikeProduct" asChild>
          <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
            <Ionicons name="heart-outline" size={24} color={Colors.primary} />
            {likes > 0 && (
              <Animated.View
                style={[styles.notificationBadge, { opacity: badgeAnimation }]}
              >
                <Text style={styles.badgeText}>{likes}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    width: "60%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 3,
  },
  searchTxt: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
    padding: 10,
  },
  notificationBadge: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Header;
