import { View, Text, StyleSheet, Touchable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

type Props = {};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[Styles.container, { paddingTop: insets.top }]}>
      <Text style={Styles.logo}>SJ</Text>
      <Link href={"/explore"} asChild>
        <TouchableOpacity style={Styles.searchBtn}>
          <Text style={Styles.searchtxt}>Search</Text>
          <Ionicons name="search-outline" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Header;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    width: "90%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 20,
    gap: 10, // Ensure the layout supports gap property
  },
  searchtxt: {
    color: Colors.gray,
    fontSize: 16,
  },
});
