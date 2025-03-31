import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Href, Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Google from "../assets/images/google-logo.svg";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

type Props = {
  emailHref: Href<string | object>;
};

const socialLoginButton = (props: Props) => {
  return (
    <View style={styles.socialLoginWrapper}>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Link href={props.emailHref} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={22} color={Colors.gray} />
            <Text style={styles.buttonText}>Continue with Email </Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Google width={20} height={20} />
          <Text style={styles.buttonText}>Continue with Google </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
        <Link href={"/signin"} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="logo-apple" size={22} color={Colors.gray} />
            <Text style={styles.buttonText}>Continue with Apple </Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </View>
  );
};

export default socialLoginButton;

const styles = StyleSheet.create({
  discription: {
    fontSize: 14,
    color: Colors.gray,
    letterSpacing: 1.2,
    lineHeight: 30,
    marginBottom: 20,
  },
  socialLoginWrapper: {
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
});
