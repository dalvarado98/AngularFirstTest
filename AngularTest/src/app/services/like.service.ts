import { Like } from './../models/Like';
import { ApiRoutes } from './../shared/api/api-routes';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  public createLike(like: Like): Observable<HttpResponse<Like>> {
    return this.http.post<Like>(ApiRoutes.API_ROOT + ApiRoutes.LIKE_CONTROLLER, like, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public deleteLike(like: Like): Observable<HttpResponse<Like>> {
    return this.http.put<Like>(ApiRoutes.API_ROOT + ApiRoutes.LIKE_CONTROLLER, like, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public isLiked(userId: number, postId: number): Observable<HttpResponse<Like>> {
    return this.http.get<Like>(ApiRoutes.API_ROOT + ApiRoutes.LIKE_CONTROLLER + "getLiked?userId=" + userId +
                              "&postId=" + postId, {
      observe: 'response',
      responseType: 'json'
    });
  }
}
