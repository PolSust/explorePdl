import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HotelForm from './HotelForm';
import HotelListScreen from '../common/HotelListScreen';

const AdminNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AdminScreen">
      <Stack.Screen
        name="AdminScreen"
        options={{ title: 'Espace Admin' }}
        component={HotelListScreen}
        initialParams={{ query: '', hotels: [] }}
      />
      <Stack.Screen
        name="HotelForm"
        options={{ title: "Formulaire d'Hotel" }}
        component={HotelForm}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
