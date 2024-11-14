import {HttpHandlerFn, HttpRequest} from "@angular/common/http";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = sessionStorage.getItem('auth-token');

  if (authToken) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + authToken),
    })
    return next(newReq);
  }
  return next(req);
}
