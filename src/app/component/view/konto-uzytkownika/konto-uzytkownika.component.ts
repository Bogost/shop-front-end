import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-konto-uzytkownika',
  templateUrl: './konto-uzytkownika.component.html',
  styleUrls: ['./konto-uzytkownika.component.scss']
})
export class KontoUzytkownikaComponent implements OnInit {
  name = this.userService.userAccount?.getName();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.userService.logout()
  }

}
