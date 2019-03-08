import { Tag } from './../models/Tag';
import { ApiRoutes } from './../shared/api/api-routes';
import { Post } from './../models/Post';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public createPost(post: Post): Observable<HttpResponse<Post>> {
    return this.http.post<Post>(ApiRoutes.API_ROOT + ApiRoutes.POST_CONTROLLER, post, {
      observe: 'response',
      responseType: 'json'
    });
  }

  addTagsToPost(tags: Tag[], postId: number): Observable<Post> {
    return this.http.post<Post>(ApiRoutes.API_ROOT + ApiRoutes.POST_CONTROLLER + 'addTags/' + postId, tags);
  }

  public getPosts(userId: number, filterType: number) {
    return this.http.get<any[]>(ApiRoutes.API_ROOT + ApiRoutes.POST_CONTROLLER + "getAllPost?userId=" + userId + "&queryType=" + filterType);
  }

}
