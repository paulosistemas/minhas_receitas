import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SERVER_URL, UserUrl } from '../shared/url/url.domain';
import { ChangePassword } from '../types/change-password.type';
import { Profile } from '../types/profile.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)

  constructor() {
  }

  changePassword(password: ChangePassword) {
    return this.http.post<ChangePassword>(SERVER_URL + UserUrl.CHANGE_PASSWORD, password);
  }

  update(profile: Profile, userId: number) {
    return this.http.put<Profile>(SERVER_URL + UserUrl.EDIT + userId, profile);
  }

  getOne(userId: number) {
    return this.http.get<Profile>(SERVER_URL + UserUrl.USER_URL + userId)
  }

}
