import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import AdminNavigator from '../screens/admin/AdminNavigator';
import ExploreScreen from '../screens/explore/ExploreScreen';
import profileScreen from '../screens/profile/ProfileScreen';
import ReservationsScreen from '../screens/reservations/ReservationsScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: string = '';

          if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'key' : 'key-outline';
          } else if (route.name === 'Mes Reservations') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: '#69A2B0',
        tabBarInactiveTintColor: '#CEDEF3',
        tabBarLabel: ({ focused }) => {
          let labelTxt = focused ? route.name : ' ';

          return <Text style={s.label}>{labelTxt}</Text>;
        },
        tabBarHideOnKeyboard: true,
        headerRight: () => {
          return (
            <ImageBackground
              source={require('../assets/images/Explore_logo_small_black.png')}
              resizeMode="center"
              style={tw`relative w-32 h-3/4 top-1`}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Mes Reservations" component={ReservationsScreen} />
      <Tab.Screen name="Profil" component={profileScreen} />
    </Tab.Navigator>
  );
};

const s = StyleSheet.create({
  label: {
    fontSize: 10,
  },
});

export default Tabs;
