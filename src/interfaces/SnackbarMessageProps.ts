type mode = 'error' | 'success';

export default interface SnackbarMessageProps {
  inputMessage: string;
  mode: mode;
  dismissCallback?: () => void;
}
