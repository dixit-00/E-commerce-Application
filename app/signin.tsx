import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputField from "@/Components/InputField";
import SocialLoginButton from "@/Components/socialLoginButton";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type Props = {};

const SignInScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const userData = {
      name: email.split('@')[0], // Use part of email as name
      email: email,
      avatar: `https://avatar.iran.liara.run/public/${email}`,
      lastLogin: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("userToken", "dummy-token");
      await AsyncStorage.setItem("authState", "authenticated");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Failed to save user data:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Sign In",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <InputField
          placeholder="Email Address"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.bnt}
          onPress={handleLogin}
        >
          <Text style={styles.txtbnt}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>
          Don't have an account{" "}
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTxtspan}>SignUp </Text>
            </TouchableOpacity>
          </Link>
        </Text>
        <View style={styles.divider} />
        <SocialLoginButton emailHref={"/signin"} />
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.black,
    letterSpacing: 1.2,
    marginBottom: 50,
  },
  bnt: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  txtbnt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 20,
  },
  loginTxtspan: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginTop: 30,
  },
});
