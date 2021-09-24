import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen';
import HotelListScreen from './HotelListScreen';
import HotelForm from './HotelForm';
import HotelReservation from './HotelReservation';

const ExploreNavigator = () => {
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
      <Stack.Screen
        name="HotelForm"
        options={{ title: "Formulaire d'Hotel" }}
        component={HotelForm}
      />

      <Stack.Screen
        name="HotelReservation"
        options={{ title: 'Réserver une Chambre' }}
        component={HotelReservation}
      />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
