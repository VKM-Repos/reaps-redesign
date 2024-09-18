export type LoginRequestData = {
  email: string;
  password: string;
};
export type LoginResponse = {
  status: string;
  message: string;
  data: Record<string>;
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
