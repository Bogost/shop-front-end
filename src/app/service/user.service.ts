import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ActionReport } from './action-report';
import { GoogleUserService } from './google-user.service';
import { OurUserService } from './our-user.service';
import { User } from './user';
import { UserAccount } from './user-account';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAccount: UserAccount | undefined;
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

  constructor(private http: HttpClient, private gu: GoogleUserService, private our: OurUserService) {
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

  private async loginParser(ua: string, data: any = undefined) {
    try {
      switch(ua) {
        case "google":
          await this.gu.login();
          this.userAccount = this.gu;
          break;
        case "our":
          await this.our.login(data);
          this.userAccount = this.our;
          break;
        default:
          throw new Error("wrong login argument: " + ua);
      }
    } catch(error) {
      throw error;
    }
  }

  //perform initialization, throw error if not authorized
  private async authentification()
  {
    if(!this.isLogged())
      throw new Error("User is not logged");
    if(this.userAccount == undefined)
    {
      console.log("relog");
      await this.relogin(this.loggedStatus);
    }
  }

  //kinda aliases loginParser
  async relogin(ua: string) {
    try {
      await this.loginParser(ua);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async login(ua: string, data: any = undefined) {
    try {
      await this.loginParser(ua, data);
      this.loggedStatus = ua;
    } catch(error)
    {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    try{
      await this.authentification();

      await this.userAccount?.logout();
      this.userAccount = undefined;
      this.loggedStatus = "";
      console.log("log out");
    } catch(error) {
      throw error;
    }
  }

  async getUserName(): Promise<string | undefined> {
    try {
      await this.authentification();

      return this.userAccount?.getName();
    } catch(error) {
      throw error;
    }
  }

}
