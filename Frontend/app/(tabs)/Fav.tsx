import React, { useEffect, useState, useCallback } from "react";
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TouchableOpacity, ActivityIndicator, Alert, Platform 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "../Axios/Axios";

export default function Fav() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key for forcing re-render

  // Use useCallback to memoize the fetchFavorites function
  const fetchFavorites = useCallback(async (id) => {
    if (!id) {
      console.error("No user ID provided to fetchFavorites");
      setLoading(false);
      return;
    }
    
    console.log("Fetching favorites for user:", id);
    try {
      setLoading(true);
      const response = await Axios.get(`/getFavorite/${id}`);
      console.log("API Response:", response.status, response.statusText);
      
      const data = response.data;
      console.log("Favorites data received:", JSON.stringify(data).substring(0, 100) + "...");
      
      if (Array.isArray(data)) {
        console.log(`Setting ${data.length} favorites`);
        setFavorites(data);
      } else {
        console.log("Data is not an array, setting empty favorites");
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      }
      setFavorites([]);
      Alert.alert("Error", "Failed to load favorites. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load user data and favorites on initial render or when refreshKey changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userData;
        if (Platform.OS === "web") {
          userData = localStorage.getItem("userData");
        } else {
          userData = await AsyncStorage.getItem("userData");
        }

        if (userData) {
          console.log("User data retrieved from storage");
          const parsedData = JSON.parse(userData);
          console.log("User ID:", parsedData._id);
          setUserId(parsedData._id);
          await fetchFavorites(parsedData._id);
        } else {
          console.log("No user data found in storage");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
        Alert.alert("Error", "Failed to load user data. Please login again.");
      }
    };

    fetchUserData();
  }, [fetchFavorites, refreshKey]); // Add refreshKey dependency

  // Force a refresh of favorites data
  const refreshFavorites = () => {
    console.log("Manually refreshing favorites");
    setRefreshKey(prevKey => prevKey + 1);
  };

  const clearAllFavorites =  async() => {
    // if (!userId) {
    //   Alert.alert("Error", "User ID not found. Please login again.");
    //   return;
    // }
    try {
      const response = await Axios.post("/clearFavorite", { userId });
      console.log("Clear favorites API response:", response.status, response.data)
    } catch (error) {
      console.log(error)
    }
    
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Clear All",
          onPress: async () => {
            try {
              console.log("Clearing favorites for user:", userId);
              setLoading(true);
              
              const response = await Axios.post("/clearFavorite", { userId });
              console.log("Clear favorites API response:", response.status, response.data);
              
              // Immediately update UI regardless of server response
              setFavorites([]);
              
              if (response.data.success) {
                Alert.alert("Success", "All favorites cleared!");
              } else {
                console.log("API reported failure:", response.data);
                Alert.alert("Warning", "The server reported an issue clearing favorites.");
              }
            } catch (error) {
              console.error("Error clearing favorites:", error.message);
              if (error.response) {
                console.error("Response error data:", error.response.data);
              }
              Alert.alert("Error", "Failed to clear favorites. Please try again.");
            } finally {
              setLoading(false);
              // Force a refresh after clearing
              setTimeout(refreshFavorites, 500);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorites ❤️</Text>

      <View style={styles.buttonContainer}>
        {favorites.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={clearAllFavorites}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.refreshButton} onPress={refreshFavorites}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1C1C5E" />
      ) : (
        <ScrollView>
          {favorites.length > 0 ? (
            favorites.map((fav, index) => (
              <View key={fav._id || index} style={styles.card}>
                {fav.hostelId?.length > 0 ? (
                  <>
                    <Image 
                      source={{ uri: fav.hostelId[0]?.img || "https://via.placeholder.com/150" }} 
                      style={styles.image} 
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.title}>{fav.hostelId[0]?.HostalName || "No Name"}</Text>
                      <Text style={styles.address}>{fav.hostelId[0]?.mobile || "No Contact"}</Text>
                      <Text style={styles.price}>INR {fav.hostelId[0]?.rate || "N/A"}</Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.noFavText}>Invalid data format</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noFavText}>No favorites yet! ❤️</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#E0B974", 
    padding: 15 
  },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#1C1C5E", 
    textAlign: "center", 
    marginBottom: 10 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  clearAllButton: { 
    backgroundColor: "red", 
    padding: 10, 
    borderRadius: 5, 
    flex: 1,
    marginRight: 5,
    alignItems: "center"
  },
  clearAllText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  refreshButton: {
    backgroundColor: "#1C1C5E",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center"
  },
  refreshText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  card: { 
    backgroundColor: "#1C1C5E", 
    borderRadius: 10, 
    marginBottom: 15, 
    overflow: "hidden" 
  },
  image: { 
    width: "100%", 
    height: 150 
  },
  cardContent: { 
    padding: 10 
  },
  title: { 
    fontSize: 18, 
    color: "white", 
    fontWeight: "bold" 
  },
  address: { 
    fontSize: 14, 
    color: "white" 
  },
  price: { 
    fontSize: 14, 
    color: "white", 
    fontWeight: "bold" 
  },
  noFavText: { 
    textAlign: "center", 
    fontSize: 16, 
    color: "#1C1C5E", 
    marginTop: 20 
  },
});