export default interface User {
  id?: number | string;
  username: string;
  email: string;
  /**
   * The hashed password
   */
  password: string;
  isAdmin: boolean;
}
