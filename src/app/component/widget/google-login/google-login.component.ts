import { Component, OnInit } from '@angular/core';
import { GoogleUserService } from 'src/app/service/google-user.service';
import { UserService } from 'src/app/service/user.service';
import { CLIENT_ID } from '../../../../../secret/data';

//declare var gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  async ngOnInit(){
    //this.gUser.init();
  }

  async authenticate() {
    this.userService.login("google");
  }

}
