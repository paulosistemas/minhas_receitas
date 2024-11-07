import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/login-response.type';
import { tap } from "rxjs";
import { LoginUrl, SERVER_URL } from '../shared/url/url.domain';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private router = inject(Router)

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(SERVER_URL + LoginUrl.LOGIN_URL, { email, password })
      .pipe(tap((source) => {
        sessionStorage.setItem('username', source.name)
        sessionStorage.setItem('auth-token', source.token)
      }))
  }

  register(name: string, email: string, password: string, role: string) {
    return this.http.post<LoginResponse>(SERVER_URL + LoginUrl.REGISTER_URL, { name, email, password, role})
  }

  recoverPassword(email: string) {
    return this.http.post(SERVER_URL + LoginUrl.RECOVER, { email })
  }

  logout(redirectTo = '/login'): void {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('auth-token')
    this.router.navigate([redirectTo]).then();
  }
}
