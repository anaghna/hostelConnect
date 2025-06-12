import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function UserHostelDetails() {
  const router = useRouter();

  const foodMenu = {
    Monday: "Idli, Rice & Sambar, Chapati",
    Tuesday: "Chapati, Jeera Rice, Upma",
    Wednesday: "Idli & Coconut Chutney, Rice & Sambar, Upma",
    Thursday: "Puttu, Pulao & Curd, Chapati",
    Friday: "Paratha, Rice & Curry, Upma",
    Saturday: "Dosa & Sambar, Biriyani, Poratta",
    Sunday: "Idiyappam, Rice & Dal, Chapati"
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: "https://i.im.ge/2025/02/11/H981XK.download-1.jpeg" }}
          style={styles.hostelImage}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Matha Caters</Text>
          <Text style={styles.subtitle}>Kottayam, Kerala 682016</Text>
          <Text style={styles.subtitle}>80M from college gate</Text>
          <Text style={styles.subtitle}>8795678874</Text>
          <Text style={styles.description}>
            We specialize in providing affordable, hygienic, and nutritious food, ensuring you enjoy the warmth of home wherever you stay.
            Whether you're a student, working professional, or traveler, our carefully curated meal plans offer a perfect balance of taste and health.
            Enjoy freshly prepared dishes, customized meal options, and timely deliveries—bringing the feel of home with every perfect meal! 🍽️🏡
          </Text>

          <Text style={styles.menuTitle}>Weekly Food Menu</Text>
          <View style={styles.table}>
            {Object.entries(foodMenu).map(([day, menu]) => (
              <View key={day} style={styles.row}>
                <Text style={styles.cellDay}>{day}:</Text>
                <Text style={styles.cellMenu}>{menu}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#E0B974" 
  },
  backButton: { 
    position: "absolute", 
    top: 40, 
    left: 20, 
    zIndex: 1 
  },
  hostelImage: { 
    width: "100%", 
    height: 250 
  },
  content: { 
    paddingBottom: 90 
  },
  detailsContainer: { 
    padding: 20, 
    backgroundColor: "#E0B974", 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    marginTop: -30 
  },
  title: { 
    fontSize: 25, 
    fontWeight: "bold", 
    color: "#FFF" 
  },
  subtitle: { 
    fontSize: 15, 
    color: "#FFF", 
    marginBottom: 10 
  },
  description: { 
    fontSize: 15, 
    color: "#FFF", 
    marginBottom: 20 
  },
  menuTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#FFF", 
    marginTop: 20, 
    textAlign: "center" 
  },
  table: { 
    marginTop: 10, 
    backgroundColor: "#1C1C5E", 
    borderRadius: 8, 
    padding: 10 
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#E0B974", 
    paddingVertical: 8 
  },
  cellDay: { 
    width: "30%", 
    fontWeight: "bold", 
    color: "#FFF", 
    marginLeft: 10 
  },
  cellMenu: { 
    width: "60%", 
    color: "#FFF" 
  }
});