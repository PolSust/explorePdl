import { Dispatch, SetStateAction } from 'react';
import SnackbarMessageProps from './SnackbarMessageProps';

export default interface SnackbarMessageContextInterface
  extends SnackbarMessageProps {
  setSnackbarMessage: Dispatch<SetStateAction<SnackbarMessageContextInterface>>;
}
