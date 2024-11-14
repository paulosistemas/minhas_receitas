export const SERVER_URL = 'http://localhost:8080/'

export class LoginUrl {
  static LOGIN_URL = 'auth/login'
  static REGISTER_URL = 'users/register'
  static RECOVER = 'users/recover-password'
}

export class RecipeUrl {
  static RECIPES_URL = 'recipes/'
  static CREATE = RecipeUrl.RECIPES_URL + 'create'
  static UPDATE = RecipeUrl.RECIPES_URL + 'update/'
  static GET_ALL = RecipeUrl.RECIPES_URL + 'category/'
}

export class ProductUrl {
  static PRODUCT_URL = 'products'
  static CREATE = ProductUrl.PRODUCT_URL + '/create'
}
