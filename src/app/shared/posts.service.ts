import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  serverUrl = `${environment.fbDbUrl}`;

  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${this.serverUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
      }));
  }

  getAll(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.serverUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        })).reverse();
      }));
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.serverUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        };
      }));
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.serverUrl}/posts/${post.id}.json`, post);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/posts/${id}.json`);
  }
}
