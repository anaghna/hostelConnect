import { View, StyleSheet } from 'react-native';
import React from 'react';
// import NewhomeScreen from '../screens/signuppage';
import Userhomepage from '../screens/Userhomepg'
export default function Index() {
  return (
    <View style={styles.container}>
      {/* <NewhomeScreen /> */}
      <Userhomepage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
