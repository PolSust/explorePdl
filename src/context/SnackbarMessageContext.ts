import { createContext } from 'react';
import SnackbarMessageContextInterface from '../interfaces/SnackbarMessageContext';

const SnackbarMessageContext = createContext<SnackbarMessageContextInterface>({
  inputMessage: '',
  mode: 'error',
  setSnackbarMessage: () => {},
});

export default SnackbarMessageContext;
