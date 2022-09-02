import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private AUTH_PATH: string = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  async logIn(email: string, password: string): Promise<boolean> {
    const url = `${this.AUTH_PATH}/users/login`;
    return this.http.post(url, {
      Email: email,
      Password: password
    }, {responseType: 'text', observe: 'response'}).toPromise().then((res) => {
      const jwt = res.headers.get('Token');
      localStorage.setItem('intelli-token', jwt);
      localStorage.setItem('intelli-user', res.body);
      localStorage.setItem('intelli-username', email);
      window.USER = email;
      return !!jwt;
    });
  }

  async signUp(email: string, password: string): Promise<boolean> {
    const url = `${this.AUTH_PATH}/users/signup`;
    return this.http.post(url, {
      Email: email,
      Password: password
    }, {responseType: 'text', observe: 'response'}).toPromise().then((res) => {
      const jwt = res.headers.get('Token');
      localStorage.setItem('intelli-token', jwt);
      localStorage.setItem('intelli-user', res.body);
      localStorage.setItem('intelli-username', email);
      window.USER = email;
      return !!jwt;
    });
  }

  async logout(): Promise<boolean> {
    localStorage.clear();
    return Promise.resolve(true);
  }

}
