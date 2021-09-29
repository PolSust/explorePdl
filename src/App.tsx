import React, { createContext, useContext, useEffect, useState } from 'react';
import SnackbarMessage from './components/SnackbarMessage';
import Tabs from './screens/tabs/Tabs';
import SnackbarMessageContext from './context/SnackbarMessageContext';
import SnackbarMessageContextInterface from './interfaces/SnackbarMessageContext';
import 'react-native-url-polyfill/auto';
import Auth from './screens/auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './context/UserContext';
import UserContextInterface from './interfaces/UserContextInterface';
import User from './interfaces/User';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ActivityIndicator } from 'react-native-paper';

const App = () => {
  const [snackbarMessage, setSnackbarMessage] =
    useState<SnackbarMessageContextInterface>({
      inputMessage: '',
      mode: 'error',
      setSnackbarMessage: () => {},
    });

  const [loading, setLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>();
  const [user, setUser] = useState<UserContextInterface>({
    email: '',
    password: '',
    username: '',
    isAdmin: false,
    setUserContext: () => {},
  });

  useEffect(() => {
    // AsyncStorage.removeItem('user');
    AsyncStorage.getItem('user')
      .then((storageUser) => {
        if (storageUser) {
          setIsLogged(true);

          setUser(JSON.parse(storageUser));
        } else {
          setIsLogged(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setIsLogged(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user.id) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  if (loading) {
    return (
      <View style={tw`flex h-full justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserContext.Provider
      value={{
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
        isAdmin: user.isAdmin,
        setUserContext(userInput) {
          setUser(userInput);
        },
      }}>
      <SnackbarMessageContext.Provider
        value={{
          inputMessage: snackbarMessage.inputMessage,
          mode: snackbarMessage.mode,
          setSnackbarMessage,
        }}>
        {isLogged ? <Tabs /> : <Auth />}
        <SnackbarMessage
          inputMessage={snackbarMessage.inputMessage}
          mode={snackbarMessage.mode}
          dismissCallback={() => {
            setSnackbarMessage({
              inputMessage: '',
              mode: 'error',
              setSnackbarMessage,
            });
          }}
        />
      </SnackbarMessageContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
