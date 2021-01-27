import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionReport } from 'src/app/service/action-report';
import { Message } from 'src/app/service/message';
import { VerificationService } from 'src/app/service/verification.service';

@Component({
  selector: 'app-weryfikuj',
  templateUrl: './weryfikuj.component.html',
  styleUrls: ['./weryfikuj.component.scss']
})
export class WeryfikujComponent implements OnInit {
  verified: boolean | undefined;
  message = new Message();

  constructor(private vs: VerificationService, private ac: ActivatedRoute ) { }

  ngOnInit(): void {
    this.vs.verify(this.ac.snapshot.params.code).subscribe(
      (response: ActionReport) => {
        if(response.success)
        {
          this.message.show("<strong>Sukces!</strong> Twoje konto zostało pomyślnie zweryfikowane.", "success");
          this.verified = true;
        }
        else if(response.message === "link not exist")
          this.message.show("<strong>Błąd!</strong> Ten link prawdopodobnie wygasł, zarejestruj się ponownie", "danger");
        else
          this.message.show("<strong>Ups! Coś poszło nie tak.</strong> Sprubuj ponownie później.", "danger");
      },
      (error) => {
        this.message.show(error, "danger");
      }
    )
  }

}
