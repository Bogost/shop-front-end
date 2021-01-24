import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'src/app/service/message';
import { OurUser } from 'src/app/service/our-user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  message = new Message();

  get login() {
    return this.form.get("login");
  }

  get password() {
    return this.form.get("password");
  }

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    try {
      if(this.password === null || this.login === null ) {
        console.error("No field");
        return;
      }
      let password: string = this.password.value;
      let login: string = this.login.value;
      this.userService.login("our", {login: login, password: password} as OurUser);
    } catch(error)
    {
      let errorMessage = error;
      if(error.message == "wrong login") {
        errorMessage = "<strong>Ups! pomyliłeś login</strong> Spróbuj wpisać go ponownie";
      }
      if(error.message == "wrong password") {
        errorMessage = "<strong>Ups! źle wpisałeś hasło</strong> Spróbuj wpisać nio ponownie albo skorzystaj z opcji zapomniałem hasła";
      }
      if(error.message == "internal error") {
        errorMessage = "<strong>Ups! Coś poszło nie tak.</strong> Sprubuj ponownie później.";
      }
      this.message.show(errorMessage, "danger");
    }
  }
}
