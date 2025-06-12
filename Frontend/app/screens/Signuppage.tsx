import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Feather'; // For Eye Icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './Loginpage'
export default function SigninPage() {
  const [email, setEmail] = useState("");  // State to handle email input
  const [password, setPassword] = useState(""); // State to handle password input
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
  const router = useRouter(); // Correct use of useRouter

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      const response = await fetch("http://172.16.5.232:3000/UserLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid: email, password: password }),
      });

      console.log("Raw Response:", response); // 🔹 Log raw response object

      const data = await response.json();
      console.log("Parsed Response:", data); // 🔹 Log parsed JSON data

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        await AsyncStorage.setItem("user", JSON.stringify(data));
        router.push("/(tabs)");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Illustration */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: "https://i.im.ge/2025/02/09/HiYUlh.undraw-login-wqkt-1-removebg-preview.png",
          }}
          style={styles.image}
        />
      </View>

      {/* Sign In Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Please Sign In to continue...</Text>

        {/* Username (Email) Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#8E8E8E"
          value={email}
          onChangeText={setEmail}  // Update the email state
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input} // Made the password input same as email input
            placeholder="Enter password"
            placeholderTextColor="#8E8E8E"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}  // Update the password state
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={24} color="#1E2156" />
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn} // Call handleSignIn function
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.signUpText}
            onPress={() => router.push("/screens/Loginpage")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2156",
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E2156",
  },
  image: {
    width: 850,
    height: 250,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 2.5,
    backgroundColor: "#1E2156",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#D4B678",
  },
  subtitle: {
    fontSize: 16,
    color: "#D4B678",
    marginVertical: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 1,
    padding: 15,
    marginVertical: 20,
    fontSize: 16,
    color: "#1C1C5E",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#D4B678",
    padding: 15,
    borderRadius: 9,
    marginVertical: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  signInButtonText: {
    color: "#1E2156",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#D4B678",
  },
  signUpText: {
    fontWeight: "bold",
    color: "#D4B678",
    textDecorationLine: "underline",
  },
});
