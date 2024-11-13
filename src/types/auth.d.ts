import { User } from './user';

export type LoginRequestData = {
  email: string;
  password: string;
};
export type LoginResponseData = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  user: User;
};
export type SignupRequestData = {
  email: string;
  password: string;
  // add more fields here according to backend request
};
export type SignupResponse = {
  status: string;
  message: string;
  data: Record<string>;
};
