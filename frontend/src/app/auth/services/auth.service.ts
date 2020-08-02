import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of as ObservedValueOf } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User } from '../ models/main';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private behaviorSubjectUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private behaviorSubjectLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  registrarUsuario(payload: User): Observable<User> {
    return this.http.post<User>(`${this.url}register/`, payload);
  }

  logarUsuário(payload: User): Observable<User> {
    return this.http.post<User>(`${this.url}api/v1/login/`, payload)
      .pipe(
        tap((access: User) => {
          localStorage.setItem('@AUTH', JSON.stringify(access));
          this.behaviorSubjectLogged$.next(true);
          this.behaviorSubjectUser$.next(access);
        })
      );
  }

  deslogarUsuario(): Observable<User> {
    const logOut = this.http.post<User>(`${this.url}api/v1/logout`, {});

    localStorage.clear();

    this.behaviorSubjectLogged$.next(false);
    this.behaviorSubjectUser$.next(null);

    return logOut;
  }

  verificarSeEstaAutenticado(): Observable<boolean> {
    if (this.getToken()) { return ObservedValueOf(true); }
    return ObservedValueOf(false);
  }

  getUser(): Observable<User> {
    return this.behaviorSubjectUser$.asObservable();
  }

  getToken() {
    try {
      const auth = this.getClientData();
      if (auth.hasOwnProperty('token')) {
        return auth.token;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getClientData() {
    return JSON.parse(localStorage.getItem('@AUTH'));
  }

  get url(): string {
    return `${environment.urlApi}`;
  }

}
