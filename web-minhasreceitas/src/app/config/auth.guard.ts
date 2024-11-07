import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const authToken = sessionStorage.getItem('auth-token');

  if (authToken) {
    return true;
  }

  loginService.logout();
  return false;
};
