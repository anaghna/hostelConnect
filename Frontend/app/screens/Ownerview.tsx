import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TextInput, Alert, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
//import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailedView() {
  const router = useRouter();
  const [username, setUserName] = useState("Guest");
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Animation for menu slide

    // Function to get stored data
    const getUserData = async () => {
      try {
        let userData;
        if (Platform.OS === "web") {
          userData = localStorage.getItem("user");
        } else {
          userData = await AsyncStorage.getItem("user");
        }
  
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.username || "Guest");
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenuOnOutsideClick = () => {
    if (menuVisible) {
      setMenuVisible(false);
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Logout successful');
    router.push('/screens/Ownersignin');
  }

  return (
    <TouchableWithoutFeedback onPress={closeMenuOnOutsideClick}>
      <View style={styles.outerContainer}>
        {/* Hidden Menu */}
        <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/OwnerPrifle')}>
            <FontAwesome5 name="user" size={20} color="#fff" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/Owneroominfo')}>
            <FontAwesome5 name="bed" size={20} color="#fff" />
            <Text style={styles.menuText}>Room Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/BookingHostals')}>
            <FontAwesome5 name="bell" size={20} color="#fff" />
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/screens/OwnerFood')}>
            <FontAwesome5 name="utensils" size={20} color="#fff" />
            <Text style={styles.menuText}>Food Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleLogout()}>
            <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
              <FontAwesome5 name="bars" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.ownerText}>Hi {username}!</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#999" />
            <FontAwesome5 name="search" size={20} color="#666" style={styles.searchIcon} />
          </View>

          {/* New Card with Touchability */}
          <TouchableOpacity style={styles.cardContainer} onPress={() => router.push('/screens/AdvertiseHostel')}>
            <Image source={{ uri: 'https://i.im.ge/2025/03/05/pTrCaJ.undraw-online-ad-t56y.png' }} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardDescription}>Advertise Your</Text>
              <Text style={styles.cardTitle}>Hostel</Text>
              <Text style={styles.cardDescription}>Through Us!!</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
    color: '#fff',
    marginLeft: 10,
  },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: '#000',
  },
  searchIcon: {
    padding: 10,
    fontSize: 25,
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
    fontSize: 90,
    fontWeight: 'bold',
    color: '#1C1C5E',
    marginVertical: 20,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 40,
    color: '#1C1C5E',
    textAlign: 'center',
  },
});
