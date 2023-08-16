import { Injectable } from '@angular/core';
import { Observable, catchError, from, retry, throwError } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  BASE_URL = 'http://192.168.101.15:1337/api/users';

  constructor() {}

  getUsers(): Observable<any> {
    return from(
      CapacitorHttp.request({
        url: this.BASE_URL + '?populate=*&sort=id',
        headers: { 'Content-type': 'application/json' },
        method: 'GET',
      })
    ).pipe(retry(1), catchError(this.errorHandler));
  }

  getUser(id: number): Observable<any> {
    return from(
      CapacitorHttp.request({
        url: this.BASE_URL + '/' + id + '?populate=*',
        headers: { 'Content-type': 'application/json' },
        method: 'GET',
      })
    ).pipe(retry(1), catchError(this.errorHandler));
  }

  updateUser(id: number, user: User): Observable<any> {
    return from(
      CapacitorHttp.request({
        url: this.BASE_URL + '/' + id,
        headers: { 'Content-type': 'application/json' },
        data: user,
        method: 'PUT',
      })
    ).pipe(retry(1), catchError(this.errorHandler));
  }

  createUser(user: User): Observable<any> {
    return from(
      CapacitorHttp.request({
        url: this.BASE_URL,
        headers: { 'Content-type': 'application/json' },
        data: user,
        method: 'POST',
      })
    ).pipe(retry(1), catchError(this.errorHandler));
  }

  deleteUser(id: number): Observable<any> {
    return from(
      CapacitorHttp.request({
        url: this.BASE_URL + '/' + id,
        headers: { 'Content-type': 'application/json' },
        method: 'DELETE',
      })
    ).pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error instanceof ErrorEvent) errorMessage = error.message;
    else
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => {
      return errorMessage;
    });
  }
}
