export interface Recipe {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  yield: string;
  instructions: string[];
  ingredients: Ingredient[];
  user?: string;
}

export interface Ingredient {
  name: string;
  preparation: string;
  cost: string;
  amount: string;
}