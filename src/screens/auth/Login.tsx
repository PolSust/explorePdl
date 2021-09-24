import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Login = ({ route, navigation }) => {
  console.log();

  return (
    <View>
      <Text>yee</Text>
      <Button onPress={() => navigation.navigate('Signup')}>Signup</Button>
    </View>
  );
};

export default Login;
