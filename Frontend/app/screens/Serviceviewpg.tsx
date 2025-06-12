import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { 
  Image,View, Text, StyleSheet, TouchableOpacity, Alert, 
  Pressable, Animated, ScrollView 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Axios from '../Axios/Axios'
export default function DetailedView() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userName, setUserName] = useState("Mary");
  const slideAnim = useState(new Animated.Value(-250))[0]; // Sidebar animation
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        console.log(userData,"00")
        if (userData) {
          const parsedData = JSON.parse(userData);
          const userId = parsedData.user._id;
          setUserName(parsedData.user.name || "Mary");

          const response = await Axios.get(`/getMyfoods/${userId}`);
          const data = await response.json();
          console.log("Fetched foods:", data);
          setFoodList(data);
        }
      } catch (error) {
        console.error("Error fetching user or food data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clears all AsyncStorage data
      router.push('/screens/Servicesignin')
    } catch (error) {
      console.error("Error clearing local storage:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.clear(); // Clears all AsyncStorage data
              router.push('/screens/Servicesignin')
            } catch (error) {
              console.error("Error clearing local storage:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          }
        }
      ]
    );
  };
  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
//   const handleLogout = async () => {
//   Alert.alert(
//     "Logout",
//     "Are you sure you want to log out?",
//     [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Logout",
//         onPress: async () => {
//           try {
//             await AsyncStorage.clear(); // Clear AsyncStorage
//             router.replace("/login"); // Redirect to Login Page
//           } catch (error) {
//             console.error("Error clearing local storage:", error);
//             Alert.alert("Error", "Failed to log out. Please try again.");
//           }
//         },
//       },
//     ]
//   );
// };


  return (
    <Pressable style={styles.outerContainer} onPress={() => menuVisible && toggleMenu()}>
      
      {/* Sidebar Menu */}
      <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/screens/MessProfile")}>
          <FontAwesome5 name="user" size={20} color="#fff" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/screens/Servicefoodinfo")}>
          <FontAwesome5 name="utensils" size={20} color="#fff" />
          <Text style={styles.menuText}>Food Menu</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Orders', 'Orders recieved')}>
          <FontAwesome5 name="clipboard-list" size={20} color="#fff" />
          <Text style={styles.menuText}>Your Orders</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.ownerText}>Hi {userName}</Text>
      </View>
      {/* New Card with Touchability */}
      <TouchableOpacity style={styles.cardContainer} onPress={() => router.push('/screens/AdvertiseMess')}>
        <Image source={{ uri: 'https://i.im.ge/2025/03/05/pTrCaJ.undraw-online-ad-t56y.png' }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardDescription}>Advertise Your</Text>
          <Text style={styles.cardTitle}>Mess Services</Text>
          <Text style={styles.cardDescription}>Through Us!!</Text>
        </View>
        </TouchableOpacity>
      {/* Food List Display */}
      <ScrollView style={styles.foodListContainer}>
        <Text style={styles.foodTitle}>Your Food Items:</Text>
        {foodList.length > 0 ? (
          foodList.map((food, index) => (
            <View key={index} style={styles.foodCard}>
              <Text style={styles.foodType}>{food.FoodType} - {food.availability}</Text>
              <Text style={styles.foodRate}>💰 Price: ₹{food.Rate}</Text>
              <View style={styles.table}>
                {Object.keys(food).map((day, i) => (
                  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].includes(day) ? (
                    <View key={i} style={styles.row}>
                      <Text style={styles.day}>{day.toUpperCase()}:</Text>
                      <Text style={styles.meal}>{food[day]}</Text>
                    </View>
                  ) : null
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noFoodText}>No food items found.</Text>
        )}
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#E0B974',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C5E',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  hamburgerButton: {
    marginRight: 10,
    marginTop: 20,
  },
  ownerText: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#ffff',
    marginTop: 20,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: -250,
    width: 250,
    height: '100%',
    backgroundColor: '#2C2C6E',
    paddingTop: 50,
    zIndex: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  menuText: {
    fontSize: 18,
    color: '#ffff',
    marginLeft: 10,
  },
  foodListContainer: {
    padding: 20,
  },
  foodTitle: {
    color: '1C1C5E',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodCard: {
    backgroundColor: '#2C2C6E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  foodType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C5E',
    marginBottom: 5,
  },
  foodRate: {
    fontSize: 16,
    color: '#1C1C5E',
    marginBottom: 10,
  },
  table: {
    backgroundColor: '#444',
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingVertical: 5,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C5E',
  },
  meal: {
    fontSize: 16,
    color: '#1C1C5E',
  },
  noFoodText: {
    color: '#1C1C5E',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: '#ffff',
    borderRadius: 12,
    margin: 21,
    overflow: 'hidden',
    height: 600,
  },
  cardImage: {
    width: '100%',
    height: 300,
  },
  cardTextContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 73,
    fontWeight: 'bold',
    color: '#1C1C5E',
    marginVertical: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 40,
    color: '#1C1C5E',
    textAlign: 'center',
  },
});
