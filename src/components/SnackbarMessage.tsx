import React, { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import SnackbarMessageProps from '../interfaces/SnackbarMessageProps';

const SnackbarMessage = ({
  inputMessage,
  mode,
  dismissCallback,
}: SnackbarMessageProps) => {
  const [color, setColor] = useState('rgba(255, 255, 255, 0)');

  const [message, setMessage] = useState<string>(inputMessage);

  useEffect(() => {
    if (mode == 'success') {
      setColor('#4CAF50');
    } else if (mode == 'error') {
      setColor('#F44336');
    }

    setMessage(inputMessage);
  }, [inputMessage]);

  return (
    <>
      {inputMessage != '' && (
        <Snackbar
          style={{ backgroundColor: color, position: 'relative', bottom: 60 }}
          duration={5000}
          visible={inputMessage != ''}
          onDismiss={() => {
            if (dismissCallback) {
              dismissCallback();
            }
          }}>
          {message}
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarMessage;
