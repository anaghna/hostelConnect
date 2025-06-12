import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
// import 'react-native-get-random-values';

export default function index() {
  return  <Redirect href="/Home" />;
}