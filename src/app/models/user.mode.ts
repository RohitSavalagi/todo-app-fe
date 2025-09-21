export interface User {
  userName: string;
  password: string;
  token?: string;
}

export type SafeUser = Omit<User, 'password'>;
