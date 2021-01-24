import { Injectable } from '@angular/core';
import { CLIENT_ID } from 'secret/data';
import { UserAccount } from './user-account';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleUserService implements UserAccount {
  public gapiSetup: boolean = false //marks if gapi library has been loaded
  public authInstance: any;
  public error: string = "";
  public user: any;

  constructor() {}

  async getName(): Promise<string> {
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return this.user.getBasicProfile().getName();
  }

  async logout(): Promise<void> {
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    this.authInstance.signOut();
    this.authInstance.disconnect();
  }

  //if user is not logged - log in
  async login(): Promise<any> {
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    //check if user is signed in (no double login on restarts)
    //for relogin
    if(this.authInstance.isSignedIn.get())
    {
      this.user = this.authInstance.currentUser.get();
      return;
    }

    return this.authInstance.signIn().then(
      (user: any) => {
        this.user = user;
      },
      //wywołany m. in. gdy wyskakujące okienko zostanie zamknięte przez użytkownika
      (error: string) => {
        this.error = error;
        throw error;
      }
    )
  }

  async initGoogleAuth(): Promise<void> {
    console.log("init google auth");
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

  // async checkIfUserAuthenticated(): Promise<boolean> {
  //   if( !this.gapiSetup ) {
  //     await this.initGoogleAuth();
  //   }
  //   return this.authInstance ? this.authInstance.isSignedIn.get() : false;
  // }
}
