export type AuthUser = {
  id: string;
  login: string;
  name: string;
};

export type LoginPayload = {
  login: string;
  password: string;
};
