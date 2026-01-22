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
