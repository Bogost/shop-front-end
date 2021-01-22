import { Injectable } from '@angular/core';
import { CLIENT_ID } from 'secret/data';
import { UserAccount } from './user-account';
import { UserService } from './user.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleUserService implements UserAccount {
  public gapiSetup: boolean = false //marks if gapi library has been loaded
  public authInstance: any;
  public error: string = "";
  public user: any;

  constructor(private userService: UserService) {}

  getName(): string {
    return this.user.getBasicProfile().getName();
  }

  async logout() {
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    this.authInstance.signOut();
  }

  logInUser(user: any): void{
    this.userService.login(this);
    this.user = user;

    
    console.log(user);
  }

  // async init(){
  //   if(await this.checkIfUserAuthenticated()) {
  //     this.logInUser(this.authInstance?.currentUser.get());
  //   }
  // }

  async initGoogleAuth(): Promise<void> {
    return new Promise((resolve) => {
      gapi.load('auth2', resolve);
    }).then(
      async () => {
        await gapi.auth2.init({
          client_id: CLIENT_ID,
        }).then((auth: any) => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
      }
    )
  }

  async authenticate(): Promise<any> {
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      await this.authInstance?.signIn().then(
        (user: any) => {
          this.logInUser(user);
        },
        (error: string) => this.error = error,
      )
    })
  }

  // async checkIfUserAuthenticated(): Promise<boolean> {
  //   if( !this.gapiSetup ) {
  //     await this.initGoogleAuth();
  //   }
  //   return this.authInstance ? this.authInstance.isSignedIn.get() : false;
  // }
}
