import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface UserData {
  email: string;
  name: string;
  avatar: string;
  createdAt?: string;
  lastLogin?: string;
}

const ProfileScreen = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserData>({
    name: "User",
    email: "user@gmail.com",
    avatar: "https://avatar.iran.liara.run/public",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setProfile(userData);
        } else {
          // If no user data found, redirect to sign in
          router.replace("/signin");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoggingOut(true);

            // Clear all stored data
            await AsyncStorage.multiRemove([
              "userToken",
              "userData",
              "cartItems",
              "likedItems",
              "userProfile",
              "authState",
              "userSettings",
            ]);

            // Navigate to signin screen
            router.replace("/signin");
          } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="edit" size={26} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Ionicons
                  name={item.icon}
                  size={26}
                  color="#333"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.logoutButton,
            isLoggingOut && styles.logoutButtonDisabled,
          ]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="green" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={26} color="#D32F2F" />
              <Text style={styles.logoutText}>Log Out</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const menuItems: { title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { title: "Orders", icon: "bag-outline" },
  { title: "My Details", icon: "person-outline" },
  { title: "Delivery Address", icon: "location-outline" },
  { title: "Payment Methods", icon: "card-outline" },
  { title: "Promo Codes", icon: "pricetag-outline" },
  { title: "Notifications", icon: "notifications-outline" },
  { title: "Help", icon: "help-circle-outline" },
  { title: "About", icon: "information-circle-outline" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  content: {
    padding: 25,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 25,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#FFCDD2",
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: "#D32F2F",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutText: {
    fontSize: 20,
    color: "#D32F2F",
    marginLeft: 12,
    fontWeight: "bold",
  },
  logoutButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
