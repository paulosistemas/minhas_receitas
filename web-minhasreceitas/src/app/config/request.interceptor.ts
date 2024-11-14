import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService)
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 403) {
        loginService.logout()
        return throwError(() => err)
      }
      return throwError(() => err);
    })
  );
};
