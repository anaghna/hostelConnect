import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert 
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather";
import Axios from '../Axios/Axios'
export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  // Function to handle login
  const handleLogin = async () => {
    console.log("Attempting login...");

    if (!username || !password) {
        Alert.alert("Error", "Please enter username and password!");
        return;
    }

    const payload = { username, password };

    try {
        const response = await Axios.post("/Hostalogin", payload);
        const data = response.data;

        console.log("Response Data:", data);

        // Check for a specific success indicator
        if (data.user.length === 0) {
          Alert.alert("Error", "Invalid credentials. Please try again!");
      }else{
        await AsyncStorage.setItem('user', JSON.stringify(data));
        console.log("Login success");
        Alert.alert("Success", "Login Successful!");
        router.push("/screens/Ownerview");
      } 
      
    } catch (error) {
        Alert.alert("Network Error", "Failed to connect to server!");
        console.error("API Error:", error);
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
        <Text style={styles.subtitle}>Please Sign In to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter E-mail"
          placeholderTextColor="#8E8E8E"
          value={username}
          onChangeText={setUsername}
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
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={passwordVisible ? "eye" : "eye-off"} size={24} color="#1E2156" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1E2156" 
  },
  topSection: { 
    flex: 2, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#1E2156" 
  },
  image: { 
    width: 850, 
    height: 250, 
    resizeMode: "contain" 
  },
  formContainer: { 
    flex: 2.5, 
    backgroundColor: "#1E2156", 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 20, 
    alignItems: "center" 
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
    color: "#1C1C5E" 
  },
  eyeIcon: { 
    padding: 10 
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
    fontWeight: "bold" 
  },
});