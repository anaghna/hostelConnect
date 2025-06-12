import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  Alert, ActivityIndicator, Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("http://172.16.5.232:3000/UserLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid: email, password: password }),
      });
  
      const data = await response.json();
      console.log("Parsed Response:", data);
  
      if (data.nouser) {
        Alert.alert("Login Failed", "User not found");
      } else if (data.incorrectPassword) {
        Alert.alert("Login Failed", "Incorrect password");
      } else if (data.user) {
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)");
      } else {
        Alert.alert("Error", "Unexpected response from server");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Top Section - Logo/Image */}
      <View style={styles.topSection}>
        <Image
          source={{ uri: "https://i.im.ge/2025/02/09/HiYUlh.undraw-login-wqkt-1-removebg-preview.png" }}
          style={styles.image}
        />
      </View>

      {/* Sign In Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#8E8E8E"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            placeholderTextColor="#8E8E8E"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
            <Icon name={passwordVisible ? "eye" : "eye-off"} size={24} color="#1E2156" />
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
          {loading ? <ActivityIndicator color="#1E2156" /> : <Text style={styles.signInButtonText}>Sign In</Text>}
        </TouchableOpacity>

        {/* Sign Up Section */}
        <View style={styles.signUpContainer}>
          <Text style={styles.subtitle}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/screens/Loginpage")}>
            <Text style={[styles.subtitle, styles.signUpText]}> Sign Up</Text>
          </TouchableOpacity>
        </View>

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
    width: width * 0.9,
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#D4B678",
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#D9D9D9',
    color: '#1C1C5E',
    borderRadius: 1,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
    height: 50,
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#D9D9D9',
    borderRadius: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C5E",
  },
  eyeIcon: {
    padding: 10,
  },
  signInButton: {
    backgroundColor: '#E0B974',
    borderRadius: 35,
    paddingVertical: 12,
    alignItems: 'center',
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  signInButtonText: {
    color: "#1E2156",
    fontSize: 19,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
