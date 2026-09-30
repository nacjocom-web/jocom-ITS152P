import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "/";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>("https://localhost:7029/api/login/login", {
      username,
      password
    });
  }
}
