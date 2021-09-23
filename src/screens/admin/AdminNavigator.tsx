import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from './AdminScreen';
import HotelForm from './HotelForm';

const AdminNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AdminScreen">
      <Stack.Screen
        name="AdminScreen"
        options={{ title: 'Espace Admin' }}
        component={AdminScreen}
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
