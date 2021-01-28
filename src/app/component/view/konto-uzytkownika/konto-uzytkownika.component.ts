import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-konto-uzytkownika',
  templateUrl: './konto-uzytkownika.component.html',
  styleUrls: ['./konto-uzytkownika.component.scss']
})
export class KontoUzytkownikaComponent implements OnInit {
  name: string | undefined;

  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    try {
      this.name = await this.userService.getUserName();
    } catch (error) {
      console.error(error);
    }
    console.log(this.name);
  }

  async logOut() {
    await this.userService.logout();
    this.router.navigate(["/login"]);
  }

}
