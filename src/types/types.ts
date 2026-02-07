export type ApiError = {
  message: string;
  status: string;
};

export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type IngredientSelected = Ingredient & { uuid: string };

export type IngredientsTab = {
  id: number;
  title: string;
  type: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type OrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: string;
  message: string;
};

export type ResetPasswordRequest = {
  password: string;
  token: string;
};

export type ResetPasswordResponse = {
  success: string;
  message: string;
};

export type CreateUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type RegisterUserRequest = {
  email: string;
  password: string;
  name: string;
};

export type AuthError = {
  message: string;
  status: number;
};

export type AuthUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type LogoutRequest = {
  token: string;
};

export type LogoutResponse = {
  success: string;
  message: string;
};

export type TokenRequest = {
  token: string | null;
};

export type TokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = {
  email: string;
  name: string;
};

export type UserInfoResponse = {
  success: string;
  user: {
    email: string;
    name: string;
  };
};

export type UserInfoUpdateRequest = {
  name: string;
  login: string;
  password: string;
};

export type UserInfoUpdateResponse = {
  success: string;
  user: {
    email: string;
    name: string;
  };
};
