import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationTypeForReplace: 'push' }}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default Auth;
