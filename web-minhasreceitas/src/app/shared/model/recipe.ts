export interface Recipe {
  id: number;
  name: string;
  hint?: string;
  image?: string;
  preparationMode: string;
  category: {
    id: number;
  }
  ingredients: [
    {
      product: {
        id: number;
      },
      unit: {
        id: number;
      },
      amount: string;
    }
  ]
}
