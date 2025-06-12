import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Axios from '../Axios/Axios'
export default function OwnerFood() {
  const router = useRouter();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [foodType, setFoodType] = useState('Veg');
  const [foodDetails, setFoodDetails] = useState({ Breakfast: '', Lunch: '', Dinner: '' });

  const handleSave = async () => {
    try {
      const hostelData = await AsyncStorage.getItem('user');
      const hostel = JSON.parse(hostelData);

      if (!hostel?.user?._id) {
        Alert.alert('Error', 'User not found!');
        return;
      }

      const foodData = {
        hostelId: hostel.user._id,
        day: selectedDay,
        type: foodType,
        details: foodDetails,
      };

      const response = await Axios.post('/addFoodHostal', {
          foodData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        Alert.alert('Success', 'Food added successfully');
        setFoodDetails({ Breakfast: '', Lunch: '', Dinner: '' });
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  const handleInputChange = (meal, text) => {
    setFoodDetails((prevState) => ({
      ...prevState,
      [meal]: text,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.semicircle}>
          <Image 
            source={{ uri: 'https://i.im.ge/2025/02/12/HjvsfP.undraw-my-personal-files-886p-removebg-preview.png' }} 
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/screens/Ownerview')}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Fill out the details to register your mess</Text>
      </View>

      {/* Form Section */}
      <Text style={styles.sectionTitle}>Mess Details</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Day</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedDay} onValueChange={setSelectedDay} style={styles.picker}>
            {daysOfWeek.map((day, index) => (
              <Picker.Item key={index} label={day} value={day} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food Type</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={foodType} onValueChange={setFoodType} style={styles.picker}>
            <Picker.Item label="Veg" value="Veg" />
            <Picker.Item label="Non-Veg" value="Non-Veg" />
          </Picker>
        </View>
      </View>

      {['Breakfast', 'Lunch', 'Dinner'].map((meal, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{meal} Details</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${meal} details`}
            multiline
            numberOfLines={4}
            value={foodDetails[meal]}
            onChangeText={(text) => handleInputChange(meal, text)}
          />
        </View>
      ))}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    paddingBottom: 120, 
    paddingHorizontal: 20, 
    backgroundColor: '#E0B974' 
  },
  header: { 
    backgroundColor: '#E0B974', 
    paddingBottom: 100, 
    position: 'relative' 
  },
  semicircle: { 
    width: 446, 
    height: 350, 
    backgroundColor: '#1C1C5E', 
    position: 'absolute', 
    top: -100, 
    left: '50%', 
    transform: [{ translateX: -200 }], 
    borderBottomLeftRadius: 200, 
    borderBottomRightRadius: 200, 
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden' 
  },
  headerImage: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    top: 0, 
    left: 0 
  },
  backButton: { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 10 
  },
  backButtonText: { 
    color: '#fff', 
    fontSize: 27, 
    fontWeight: 'bold' 
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 130, 
    marginLeft: 8, 
    color: '#FFF' 
  },
  sectionTitle: { 
    fontSize: 23, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginLeft: 8, 
    color: '#FFF' 
  },
  inputContainer: { 
    marginBottom: 15,
    marginLeft: 8, 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1C1C5E', 
    marginBottom: 5 
  },
  pickerContainer: {
    borderWidth: 1, 
    borderColor: '#CCC',
    borderRadius: 5, 
    backgroundColor: '#D9BD8E', 
    height: 40, 
    overflow: 'hidden',
  },
  picker: {
    height: 40, 
    color: '#000',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#CCC',
    borderRadius: 5, 
    padding: 10, 
    fontSize: 16,
    backgroundColor: '#D9BD8E' 
  },
  submitButton: { 
    backgroundColor: '#1C1C5E', 
    paddingVertical: 15, 
    borderRadius: 35, 
    alignItems: 'center', 
    marginTop: 20, 
    marginHorizontal: 20, 
    elevation: 5 
  },
  submitButtonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});
