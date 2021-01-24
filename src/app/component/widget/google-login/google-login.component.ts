import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

//declare var gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit(){
  }

  async authenticate() {
    try {
      await this.userService.login("google");
      this.router.navigate(["/konto_uzytkownika"]);
    } catch(error) {}
  }

}
