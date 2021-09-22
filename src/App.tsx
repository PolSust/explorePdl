import React, { useState } from 'react';
import SnackbarMessage from './components/SnackbarMessage';
import Tabs from './components/Tabs';
import SnackbarMessageContext from './context/SnackbarMessageContext';
import SnackbarMessageContextInterface from './interfaces/SnackbarMessageContext';
import SnackbarMessageProps from './interfaces/SnackbarMessageProps';

const App = () => {
  const [snackbarMessage, setSnackbarMessage] =
    useState<SnackbarMessageContextInterface>({
      inputMessage: '',
      mode: 'error',
      setSnackbarMessage: () => {},
    });

  return (
    <SnackbarMessageContext.Provider
      value={{
        inputMessage: snackbarMessage.inputMessage,
        mode: snackbarMessage.mode,
        setSnackbarMessage,
      }}>
      <Tabs />
      <SnackbarMessage
        inputMessage={snackbarMessage.inputMessage}
        mode={snackbarMessage.mode}
      />
    </SnackbarMessageContext.Provider>
  );
};

export default App;
