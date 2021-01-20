import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ActionReport } from './action-report';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      //client side error like lost connection
      console.error('Error: ', error.error.message);
      return throwError('<strong>Problem z połączeniem.</strong> Sprawdź swoje połączenie z internetem, lub sprubój ponownie później.');
    } else {
      //backend returned error
      console.error(`Backend returned code ${error.status}\n body was: ${error.error}`);
      return throwError('<strong>Wystąpił problem.</strong> Spróbuj ponownie później');
    }
  }

  register(user: User): Observable<ActionReport> {
    let url = environment.endpoint + "/user/register";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ActionReport>(url,user,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
