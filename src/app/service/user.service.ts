import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ActionReport } from './action-report';
import { GoogleUserService } from './google-user.service';
import { User } from './user';
import { UserAccount } from './user-account';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userAccount: UserAccount | undefined;
  private loggedMsg: BehaviorSubject<string> = new BehaviorSubject<string>(this.loggedStatus);

  get loggedStatus(): string {
    let logged = sessionStorage.getItem("logged");
    console.log("logged status: " + logged);
    return logged === null ? "" : logged;
  }

  set loggedStatus(status: string) {
    sessionStorage.setItem("logged", status);
    this.loggedMsg.next(status);
    console.log("change status for: " + status);
  }

  isLogged(): boolean {
    return this.loggedStatus.length > 0;
  }

  //do refaktoryzacji (operacje niepotrzebnie się powtarzają)
  constructor(private http: HttpClient, private gu: GoogleUserService) {

    //po odświerzeniu jeżeli jest użytkownik zalogowany przez google,
    // z automatu wywołuje wyskakujące okienko domyślnie blokowane przez przeglądarkę
    if(this.isLogged())
      this.login(this.loggedStatus);

    console.log("logged: " + this.isLogged());
  }

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

  async login(ua: string) {
    try {
      console.log("begin login. type = " + ua);
      switch(ua) {
        case "google":
          console.log("begin google login");
          await this.gu.login();
          console.log("google login 1");
          //if no errors assign userAccount
          this.userAccount = this.gu;
          console.log("google login 2");
          break;
        default:
          throw new Error("wrong login argument: " + ua);
      }
      console.log("change log state");
      this.loggedStatus = ua;
    } catch(error)
    {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    //await this.userAccount?.logout();
    await this.gu.logout();
    this.userAccount = undefined;
    this.loggedStatus = "";
    console.log("log out");
  }

}
