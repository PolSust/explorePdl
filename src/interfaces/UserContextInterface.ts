import User from './User';

export default interface UserContextInterface extends User {
  setUserContext: (user: UserContextInterface) => void;
}
