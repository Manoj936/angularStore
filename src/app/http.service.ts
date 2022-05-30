import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  AUTH_TOKEN = 'auth_token';
  BaseUrl = 'https://jsonplaceholder.typicode.com/'
  constructor(private http: HttpClient) { }


  get(url: string, params?: any): Observable<any> {
    const data = { params, headers: this.getAuthHeader() };
    return this.http.get(this.BaseUrl + url, data).pipe(catchError(this.errorHandler.bind(this)))
  }
  private getAuthHeader(): { [header: string]: string | string[]; } {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`
    };
  }
  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      console.log('Invalid User')
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      // this will occur when not connected to internet
      console.log('Please connect to internet');
    } else {
      message = key + ' : ' + message;
    }
    return throwError({messages: message, error});
  }
}
