import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#1C1C5E',
          borderTopWidth: 0,
          height: 60,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Fav"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="MyBookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="check-box" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Compare"
        options={{
          title: 'Compare',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="compare-arrows" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right.square" color={color} />,
        }}
      />
    </Tabs>
  );
}
