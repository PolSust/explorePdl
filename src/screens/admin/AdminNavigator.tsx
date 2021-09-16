import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminScreen from './AdminScreen';
import HotelForm from './HotelForm';

const AdminNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AdminScreen">
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen name="HotelForm" component={HotelForm} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
