export type ApiError = {
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
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

export type OrderRequest = {
  ingredients: string[];
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

export type RegisterResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
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

export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum WebSocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
  MESSAGE = "message",
}

export type WebSocketMessage<T = unknown> = {
  event: string;
  data: T;
  timestamp: number;
};

export type WebSocketConfig = {
  url: string;
  reconnectAttempts?: number;
  reconnectInterval?: number;
};
