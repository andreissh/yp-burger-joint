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

export type ForgotPasswordResponse = {
  success: string;
  message: string;
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

export type AuthUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type LogoutResponse = {
  success: string;
  message: string;
};

export type TokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = {
  success: string;
  user: {
    email: string;
    name: string;
  };
};

export type UserInfoUpdate = {
  success: string;
  user: {
    email: string;
    name: string;
  };
};
