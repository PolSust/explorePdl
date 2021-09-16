import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AdminScreen from '../screens/admin/AdminScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import profileScreen from '../screens/profile/ProfileScreen';
import ReservationsScreen from '../screens/reservations/ReservationsScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: ({focused}) => {
          let labelTxt = focused ? route.name : ' ';

          return <Text style={s.label}>{labelTxt}</Text>;
        },
        tabBarHideOnKeyboard: true,
        headerRight: () => {
          return (
            <Image source={require('./assets/images/Explore_logo_small.png')} />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
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
