export type User = {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
export type RegisterResponse = {
  register: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
};
export type RegisterVariables = {
  email: string;
  password: string;
  name?: string;
  imageUrl?: string;
};