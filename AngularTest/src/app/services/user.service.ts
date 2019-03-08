import { Tag } from './../models/Tag';
import { ApiRoutes } from './../shared/api/api-routes';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(ApiRoutes.API_ROOT + ApiRoutes.USER_CONTROLLER, user, {
      observe: 'response',
      responseType: 'json'
    });
  }

  addTagsToUser(tags: Tag[], userId: number): Observable<User> {
    return this.http.post<User>(ApiRoutes.API_ROOT + ApiRoutes.USER_CONTROLLER + 'addTags/' + userId, tags);
  }

  public LogUser(nickname: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(ApiRoutes.API_ROOT + ApiRoutes.USER_CONTROLLER + "login?nickname=" + nickname, {
      observe: 'response',
      responseType: 'json'
    });
  }
}
