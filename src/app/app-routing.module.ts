import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/view/home/home.component';
import { InformacjeOFirmieComponent } from './component/view/informacje-o-firmie/informacje-o-firmie.component';
import { KontaktComponent } from './component/view/kontakt/kontakt.component';
import { KontoUzytkownikaComponent } from './component/view/konto-uzytkownika/konto-uzytkownika.component';
import { LoginComponent } from './component/view/login/login.component';
import { PageNotFoundComponent } from './component/view/page-not-found/page-not-found.component';
import { PrzesylkiZagraniczneComponent } from './component/view/przesylki-zagraniczne/przesylki-zagraniczne.component';
import { RegisterComponent } from './component/view/register/register.component';
import { RegulaminComponent } from './component/view/regulamin/regulamin.component';
import { AntiauthGuard } from './guard/antiauth.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'informacje_o_firmie', component: InformacjeOFirmieComponent},
  { path: 'kontakt', component: KontaktComponent},
  { path: 'przesylki_zagraniczne', component: PrzesylkiZagraniczneComponent},
  { path: 'regulamin', component: RegulaminComponent},
  { path: 'login', component: LoginComponent, canActivate: [AntiauthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AntiauthGuard]},
  { path: 'konto_uzytkownika', component: KontoUzytkownikaComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
