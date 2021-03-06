import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import ExploreNavigator from './explore/ExploreNavigator';
import profileScreen from './profile/ProfileScreen';
import ReservationsScreen from './reservations/ReservationsScreen';

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
          let labelStyle = focused ? s.labelActive : s.label;

          return <Text style={labelStyle}>{labelTxt}</Text>;
        },
        tabBarHideOnKeyboard: true,
        headerRight: () => {
          return (
            <ImageBackground
              source={require('../../assets/images/Explore_logo_small_black.png')}
              resizeMode="center"
              style={tw`relative w-32 h-3/4 top-1`}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Explore"
        component={ExploreNavigator}
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
  labelActive: {
    fontSize: 10,
    color: '#69A2B0',
  },
});

export default Tabs;
