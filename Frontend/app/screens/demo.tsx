import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, TextInput, ScrollView, 
  Image, TouchableOpacity, Dimensions, Alert, Platform 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function UserSecond() {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");
  const [hostels, setHostels] = useState([]);
  const [foodServices, setFoodServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to get stored data
  const getUserData = async () => {
    try {
      let userData;
      if (Platform.OS === "web") {
        userData = localStorage.getItem("userData"); // Use localStorage on web
      } else {
        userData = await AsyncStorage.getItem("userData");
      }

      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.username || "Guest");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  // Fetch user data & hostel/food services
  useEffect(() => {
    getUserData();

    const fetchHostels = async () => {
      try {
        const response = await fetch("http://172.16.5.232:3000/getallhostel");
        const data = await response.json();
        setHostels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching hostels:", error);
        setHostels([]);
      }
    };

    const fetchFoodServices = async () => {
      try {
        const response = await fetch("http://172.16.5.232:3000/getallmess");
        const data = await response.json();
        setFoodServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching food services:", error);
        setFoodServices([]);
      }
    };

    fetchHostels();
    fetchFoodServices();
  }, []);

  // Logout Function (Supports Web & Mobile)
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            if (Platform.OS === "web") {
              localStorage.removeItem("userData"); // Use localStorage on web
            } else {
              await AsyncStorage.removeItem("userData"); // AsyncStorage for mobile
            }
            router.push('/screens/Usersignin')
            // router.replace("/signin"); // Redirect to login page
          },
        },
      ]
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/screens/Usersearchpg`);
    }
  };

  const handleHostelPress = (id) => {
    router.push(`/screens/S&vuserpg?id=${id}`);
  };

  const handleMessPress = (id) => {
    router.push(`/screens/Servicedetailpg?id=${id}`);
  };
  const handleAddToFav = async (hostelId) => {
    try {
      // Get user data
      let storedUserData;
      if (Platform.OS === "web") {
        storedUserData = localStorage.getItem("userData");
      } else {
        storedUserData = await AsyncStorage.getItem("userData");
      }
  
      if (!storedUserData) {
        Alert.alert("Error", "User not logged in.");
        return;
      }
  
      const parsedUser = JSON.parse(storedUserData);
      console.log(parsedUser, "fav clicked");
  
      // Fetch hostel details
      const response = await fetch(`http://172.16.5.232:3000/get-SIngle-hostal/${hostelId}`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch hostel details.");
      }
  
      const hostelData = await response.json();
      console.log(hostelData, "hosteldata");
  
      if (!hostelData || Object.keys(hostelData).length === 0) {
        Alert.alert("Error", "Hostel details not found.");
        return;
      }
  
      // Prepare data for favorite API
      const favData = {
        userData: parsedUser,
        hostels: hostelData,
      };
  
      // Send to /addToFavorite API
      const addToFavResponse = await fetch("http://172.16.5.232:3000/addToFavorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favData),
      });
  
      if (!addToFavResponse.ok) {
        throw new Error("Failed to add to favorites.");
      }
  
      const result = await addToFavResponse.json();
  
      if (result.success) {
        Alert.alert("Success", "Added to favorites!");
      } else {
        Alert.alert("Error", result.message || "Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Navbar */}
        <View style={styles.header}>
          <FontAwesome name="bars" size={24} color="white" />
          <Text style={styles.greeting}>Hi {userName}!</Text>
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="white" style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {/* Recommended Hostels */}
        <Text style={styles.sectionTitle}>Recommended Hostels</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {hostels.map((hostel) => (
            <TouchableOpacity key={hostel._id} style={styles.blueCard} onPress={() => handleHostelPress(hostel._id)}>
              <Image source={{ uri: hostel.img }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{hostel.name}</Text>
              <Text style={styles.cardAddress}>{hostel.address}</Text>
              <Text style={styles.cardPrice}>INR {hostel.price}</Text>

              <TouchableOpacity onPress={() => handleAddToFav(hostel._id)} style={styles.favButton}>
              <FontAwesome name="heart" size={18} color="#fff" />
              <Text style={styles.favButtonText}> Add to Fav</Text>
              </TouchableOpacity>

            </TouchableOpacity>
            
          ))}
        </ScrollView>

        {/* Popular Food Services */}
        <Text style={styles.sectionTitle}>Popular Food Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {foodServices.map((service) => (
            <TouchableOpacity key={service._id} style={styles.blueCard} onPress={() => handleMessPress(service._id)}>
              <Image 
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/8671/8671414.png" }} 
                style={styles.cardImage} 
              />

              {/* <Image source="https://cdn-icons-png.flaticon.com/512/8671/8671414.png" style={styles.cardImage} /> */}
              <Text style={styles.cardTitle}>{service.name}</Text>
              <Text style={styles.cardAddress}>{service.address}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  favButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E63946", // Red like button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 8,
  },
  favButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
  container: { flex: 1, backgroundColor: "#E0B974" },
  header: { 
    backgroundColor: "#1C1C5E", 
    padding: 20, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  greeting: { color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  logoutIcon: { marginRight: 10 },
  searchContainer: { flexDirection: "row", backgroundColor: "white", margin: 14, borderRadius: 10, alignItems: "center", paddingHorizontal: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  searchIcon: { marginLeft: 10 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", margin: 10, color: "#1C1C5E" },
  horizontalScroll: { paddingVertical: 10 },
  blueCard: { backgroundColor: "#1C1C5E", padding: 10, height: 220, borderRadius: 10, marginHorizontal: 10 },
  cardImage: { width: 155, height: 150, borderRadius: 10,padding:50 },
  cardTitle: { fontSize: 18, color: "white", marginTop: 5 },
  cardAddress: { fontSize: 12, color: "white" },
  cardPrice: { fontSize: 12, color: "white" },
});
