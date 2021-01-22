import { Component, OnInit } from '@angular/core';
import { GoogleUserService } from 'src/app/service/google-user.service';
import { CLIENT_ID } from '../../../../../secret/data';

//declare var gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  constructor(private gUser: GoogleUserService) { }

  async ngOnInit(){
  }

  async authenticate(): Promise<any> {
    this.gUser.authenticate();
  }

}
