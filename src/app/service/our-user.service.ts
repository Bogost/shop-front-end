import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionReport } from './action-report';
import { OurUser } from './our-user';
import { UserAccount } from './user-account';
import { httpErrorHandler } from './error-handlers';

@Injectable({
  providedIn: 'root'
})
export class OurUserService implements UserAccount{

  constructor(private http: HttpClient) { }

  async getName(): Promise<string> {
    let name: string = "";
    await this.nameRequest().pipe(
      tap( (n: string) => name = n),
      first(),
    ).toPromise();
    return name;
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem("access_token");
  }

  async login(user: OurUser) {
    try {
      if(sessionStorage.getItem("access_token") !== null)
        return;
      return this.loginRequest(user).pipe(
        tap( (report: ActionReport) => {
          if(report.success){
            sessionStorage.setItem("access_token", report.message);
          } else {
            throw new Error(report.message);
          }
        }),
        first()
      ).toPromise();
    } catch(error) {
      throw error;
    }
  }

  //access token in message
  loginRequest(user: OurUser): Observable<ActionReport> {
    let url = environment.endpoint + "/user/login";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ActionReport>(url,user,httpOptions)
      .pipe(
        catchError(httpErrorHandler)
      );
  }

  //to refactor
  nameRequest(): Observable<string> {
    let url = environment.endpoint + "/user/name";
    return this.http.get<string>(url).pipe(
      catchError(httpErrorHandler),
    );
  }
}
