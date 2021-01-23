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

  constructor() {}

  getName(): string {
    return this.user.getBasicProfile().getName();
  }

  async logout(): Promise<void> {
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    this.authInstance.signOut();
    this.authInstance.disconnect();
  }
  // async init(){
  //   if(await this.checkIfUserAuthenticated()) {
  //     this.logInUser(this.authInstance?.currentUser.get());
  //   }
  // }

  // async login(): Promise<any> {
  //   console.log("google 1");
  //   if(!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }
  //   console.log("google 2");
  //   return new Promise(async () => {
  //     //powoduje pojawienie się wyskakującego okienka
  //     await this.authInstance?.signIn().then(
  //       (user: any) => {
  //         this.user = user;
  //         console.log("google 3");
  //       },
  //       //wywołany m. in. gdy wyskakujące okienko zostanie zamknięte przez użytkownika
  //       (error: string) => {
  //         this.error = error;
  //         console.log("google err");
  //         throw error;
  //       }
  //     )
  //   })
  // }

  async login(): Promise<any> {
    console.log("google 1");
    if(!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    console.log("google 2");
    return this.authInstance?.signIn().then(
      (user: any) => {
        this.user = user;
        console.log("google 3");
      },
      //wywołany m. in. gdy wyskakujące okienko zostanie zamknięte przez użytkownika
      (error: string) => {
        this.error = error;
        console.log("google err");
        throw error;
      }
    )
  }

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

  // async checkIfUserAuthenticated(): Promise<boolean> {
  //   if( !this.gapiSetup ) {
  //     await this.initGoogleAuth();
  //   }
  //   return this.authInstance ? this.authInstance.isSignedIn.get() : false;
  // }
}
