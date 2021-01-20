import { Component, OnInit } from '@angular/core';
import { CLIENT_ID } from '../../../../../secret/data';

declare var gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {
  public gapiSetup: boolean = false //marks if gapi library has been loaded
  public authInstance: any;
  public error: string = "";
  public user: any;

  constructor() { }

  async ngOnInit(){
    if(await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance?.currentUser.get();
    }
  }

  //do refaktoryzacji
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
        (user: any) => this.user = user,
        (error: string) => this.error = error,
      )
    })
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if( !this.gapiSetup ) {
      await this.initGoogleAuth();
    }
    return this.authInstance ? this.authInstance.isSignedIn.get() : false;
  }

}
