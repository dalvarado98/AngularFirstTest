import { ApiRoutes } from './../shared/api/api-routes';
import { Tag } from './../models/Tag';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  public createUser(tag: Tag): Observable<HttpResponse<Tag>> {
    return this.http.post<Tag>(ApiRoutes.API_ROOT + ApiRoutes.TAG_CONTROLLER, tag, {
      observe: 'response',
      responseType: 'json'
    });
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<any[]>(ApiRoutes.API_ROOT + ApiRoutes.TAG_CONTROLLER);
  }
}
