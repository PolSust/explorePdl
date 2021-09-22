import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SnackbarMessageProps from '../interfaces/SnackbarMessageProps';

const SnackbarMessage = ({ inputMessage, mode }: SnackbarMessageProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [color, setColor] = useState('rgba(255, 255, 255, 0)');

  const [message, setMessage] = useState<string>(inputMessage);

  useEffect(() => {
    if (mode == 'success') {
      setColor('#4CAF50');
    } else if (mode == 'error') {
      setColor('#F44336');
    }

    setMessage(inputMessage);
    setVisible(true);
    console.log(inputMessage);

    return () => {
      setMessage('');
      setVisible(false);
    };
  }, [inputMessage]);

  return (
    <Snackbar
      style={{ backgroundColor: color, position: 'relative', bottom: 60 }}
      duration={5000}
      visible={visible}
      onDismiss={() => setVisible(false)}>
      {message}
    </Snackbar>
  );
};

export default SnackbarMessage;
