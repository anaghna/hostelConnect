import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#1C1C5E" />;
  }

  return (
    <View style={styles.container}>
      {/* User Avatar */}
      <Image
        source={{
          uri: user?.avatar || "https://i.pravatar.cc/150?img=3", // Default avatar
        }}
        style={styles.avatar}
      />

      {/* User Info */}
      <Text style={styles.username}>{user?.username || "Guest"}</Text>
      <Text style={styles.email}>{user?.email || "No email provided"}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C1C5E",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});

export default Profile;
