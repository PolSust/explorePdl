import { createContext } from 'react';
import User from '../interfaces/User';
import UserContextInterface from '../interfaces/UserContextInterface';

const UserContext = createContext<UserContextInterface>({
  email: '',
  password: '',
  isAdmin: false,
  username: '',
  setUserContext: (user: UserContextInterface) => {},
});

export default UserContext;
