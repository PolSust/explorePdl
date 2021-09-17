import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#69A2B0',
    accent: 'yellow',
  },
};

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
