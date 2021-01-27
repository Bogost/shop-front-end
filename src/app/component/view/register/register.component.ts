import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionReport } from 'src/app/service/action-report';
import { Message } from 'src/app/service/message';
import { User } from 'src/app/service/user';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    login: ['', [Validators.required, Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), Validators.maxLength(64)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    rpassword: ['', Validators.required],
  });

  message = new Message();

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  get login() {
    return this.form.get('login');
  }

  onSubmit() {
    let password = this.form.get("password");
    let rpassword = this.form.get("rpassword");
    let login = this.form.get("login");
    let email = this.form.get("email");
    if(password === null || rpassword === null || login === null || email === null) {
      console.error("No field");
      return;
    }
    if(password.value === rpassword.value)
    {
      this.message.hide();

      //send user data to register 
      const user: User = {
        login: login.value,
        email: email.value,
        password: password.value,
      } as User;

      this.userService.register(user).subscribe(
        (result: ActionReport) => {
          if(result.success)
          {
            console.log(result)
            this.router.navigate(["/wyslano_email_weryfikacyjny"]);
          }
          else {
            let errorMessage = "<strong>Ups! Coś poszło nie tak.</strong> Sprubuj ponownie później.";
            if(result.message == "email exist") {
              errorMessage = "<strong>Ten email już jest zarejestrowany.</strong> Jeżeli chcesz założyć niezależne konto użyj innego email.";
            }
            if(result.message == "login exist") {
              errorMessage = "<strong>Ten login już istnieje.</strong> Spróbuj go rozwinąć lub wykorzystać inny.";
            }
            this.message.show(errorMessage, "danger");
          }
        },
        error => {
          this.message.show(error, "danger");
        }
      );
    }
    else
    {
      let errorMessage = '<strong>Hasła nie są takie same!</strong> Wpisz hasła ponownie.';
      this.message.show(errorMessage, "danger");

      password.setValue("");
      rpassword.setValue("");
    }
  }
}
