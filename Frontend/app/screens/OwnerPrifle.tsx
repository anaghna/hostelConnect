import React, { useEffect, useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "react-native-image-picker";
import Axios from '../Axios/Axios'
export default function OwnerProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("user");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
          setImageUrl(parsedData.user.image || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const updateImage = async () => {
    if (!imageUrl.trim()) {
      Alert.alert("Error", "Please select an image");
      return;
    }
    try {
      console.log(userData.user._id,imageUrl)
      const response = await Axios.post("/update-hostal-image", {
        hostal_id: userData.user._id,
        image: imageUrl,
      });
      if (response.data.success) {
        Alert.alert("Success", "Image updated successfully");
      } else {
        Alert.alert("Error", "Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      Alert.alert("Error", "Something went wrong while updating the image");
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        setImageUrl(response.assets[0].uri);
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1C1C5E" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No user data found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.welcomeContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: '#fff', fontSize: 18 }}>No Image</Text>
          </View>
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Hostel Name:</Text>
        <Text style={styles.value}>{userData.user.HostalName}</Text>
        <Text style={styles.label}>Owner Name:</Text>
        <Text style={styles.value}>{userData.user.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.user.email}</Text>
        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{userData.user.mobile}</Text>
        <Text style={styles.label}>Distance from City:</Text>
        <Text style={styles.value}>{userData.user.distance} km</Text>
        <Text style={styles.label}>Rooms Available:</Text>
        <Text style={styles.value}>{userData.user.rooms}</Text>
        <Text style={styles.label}>Rate per Month:</Text>
        <Text style={styles.value}>₹ {userData.user.rate}</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Upload Your Hostal Image URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Update Image" onPress={updateImage} color="#1C1C5E" />
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E0B974",
  },
  welcomeContainer: {
    backgroundColor: "#1C1C5E",
    height: 280,
    width: "100%",
    borderBottomLeftRadius: 210,
    borderBottomRightRadius: 210,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    opacity: 0.5,
    height: 40,
  },
  uploadButtonText: {
    color: "#1C1C5E",
    fontWeight: "bold",
  },
  card: {
    padding: 20,
    width: "90%",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  input: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    marginTop:10,
  },
});
