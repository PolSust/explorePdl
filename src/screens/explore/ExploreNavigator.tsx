import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen';
import HotelListScreen from '../common/HotelListScreen';

const AdminNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ExploreScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ExploreScreen"
        component={ExploreScreen}
      />

      <Stack.Screen
        name="HotelListScreen"
        options={{ title: 'Liste des Hotels' }}
        component={HotelListScreen}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
