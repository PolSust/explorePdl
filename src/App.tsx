import React, { createContext, useContext, useEffect, useState } from 'react';
import SnackbarMessage from './components/SnackbarMessage';
import Tabs from './screens/tabs/Tabs';
import SnackbarMessageContext from './context/SnackbarMessageContext';
import SnackbarMessageContextInterface from './interfaces/SnackbarMessageContext';
import 'react-native-url-polyfill/auto';
import Auth from './screens/auth/Auth';
import User from './interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [snackbarMessage, setSnackbarMessage] =
    useState<SnackbarMessageContextInterface>({
      inputMessage: '',
      mode: 'error',
      setSnackbarMessage: () => {},
    });

  const [isLogged, setIsLogged] = useState<boolean>();
  const user = useContext({});

  useEffect(() => {
    //has to update when user logs
    // AsyncStorage.removeItem('user');
    AsyncStorage.getItem('user')
      .then((storageUser) => {
        if (storageUser) {
          setIsLogged(true);
          return createContext<User>(JSON.parse(storageUser));
        } else {
          setIsLogged(false);
        }
      })
      .catch((error) => {
        setIsLogged(false);
      });
  }, [user]);

  return (
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
          snackbarMessage.setSnackbarMessage({
            inputMessage: '',
            mode: 'error',
            setSnackbarMessage,
          });
        }}
      />
    </SnackbarMessageContext.Provider>
  );
};

export default App;
