import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, StyleSheet, ActivityIndicator 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingHostals() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerId, setOwnerId] = useState(null);

  // Fetch user data & bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("user");

        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setOwnerId(userData.user); // Owner's user_id
          console.log("Owner User ID:", userData.user._id);

          // Fetch bookings for this owner's hostel
          const response = await fetch(`http://172.16.5.232:3000/getBookings/${userData.user._id}`);
          const result = await response.json();
          console.log("working",result)
          if (response.ok) {
            setBookings(result.bookings);
          } else {
            console.error("Error fetching bookings:", result.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1C1C5E" />
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No bookings found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Hostel Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Guest Name:</Text>
            <Text style={styles.value}>{item.user.username}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{item.user.email}</Text>

            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{item.user.mobile}</Text>

            <Text style={styles.label}>Expected Joining Date:</Text>
            <Text style={styles.value}>{item.joiningDate}</Text>

            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C5E",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});

