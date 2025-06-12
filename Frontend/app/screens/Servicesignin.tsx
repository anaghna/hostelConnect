import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import Axios from '../Axios/Axios'
export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await Axios.post("/MessLogin", { emailid: email, password: password});
  
      const data = await response.data;
      console.log("API Response:", data);
  
      if (response.data && data && !data.error) {
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        Alert.alert("Success", "Logged in successfully!");
        router.push("/screens/Serviceviewpg");
      } else {
        Alert.alert("Login Failed", data.error || "Invalid email or password.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{ uri: "https://i.im.ge/2025/02/09/HiYUlh.undraw-login-wqkt-1-removebg-preview.png" }}
          style={styles.image}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#8E8E8E"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

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

        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={handleSignIn} 
          disabled={loading}
        >
          <Text style={styles.signInButtonText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#D4B678",
    //marginVertical: 4,
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
  passwordInput: {
    flex: 1,
    color: '#1C1C5E',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  signInButton: {
    backgroundColor: '#E0B974',
    borderRadius: 35,
    paddingVertical: 12,
    alignItems: 'center',
    width: "100%",
    height: 50,
    marginTop: 20,
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  signInButtonText: {
    color: "#1E2156",
    fontSize: 19,
    fontWeight: "bold",
  },
});
