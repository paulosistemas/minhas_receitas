export type RecipeRequest = {
  id?: number;
  name: string,
  hint?: string;
  image?: string;
  preparationMode: string,
  category: {
    id: number
  },
  ingredients: [
    {
      product: {
        id: number
      },
      unit: {
        id: number
      },
      amount: string
    },
    {
      product: {
        id: number
      },
      unit: {
        id: number
      },
      amount: string
    }
  ]
}

export type RecipeResponse = {
  id: number;
  name: string;
  hint?: string;
  image?: string;
  preparationMode: string;
  category: {
    id: number;
    name: string;
  }
  ingredients: [
    {
      id: number;
      amount: string;
      product: {
        id: number;
        name: string;
      },
      unit: {
        id: number;
        type: string;
      }
    }
  ]
}
