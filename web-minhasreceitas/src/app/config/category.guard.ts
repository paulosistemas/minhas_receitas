import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const allowedCategories = [
  'bolos',
  'refeicoes',
  'sobremesas',
  'bebidas',
  'drinks',
]

export const categoryGuard: CanActivateFn = (route) => {
  const router = inject(Router)
  const category = route.paramMap.get('category')

  if (allowedCategories.includes(category!)) {
    return true
  } else {
    router.navigate(['/receitas'])
    return false
  }
};
