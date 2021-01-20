import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductNavComponent } from './component/widget/product-nav/product-nav.component';
import { InfoNavComponent } from './component/widget/info-nav/info-nav.component';
import { InformacjeOFirmieComponent } from './component/view/informacje-o-firmie/informacje-o-firmie.component';
import { PrzesylkiZagraniczneComponent } from './component/view/przesylki-zagraniczne/przesylki-zagraniczne.component';
import { KontaktComponent } from './component/view/kontakt/kontakt.component';
import { RegulaminComponent } from './component/view/regulamin/regulamin.component';
import { SignerComponent } from './component/widget/signer/signer.component';
import { StickerNavComponent } from './component/widget/sticker-nav/sticker-nav.component';
import { RegisterComponent } from './component/view/register/register.component';
import { LoginComponent } from './component/view/login/login.component';
import { HomeComponent } from './component/view/home/home.component';
import { PageNotFoundComponent } from './component/view/page-not-found/page-not-found.component';
import { GoogleLoginComponent } from './component/widget/google-login/google-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductNavComponent,
    InfoNavComponent,
    InformacjeOFirmieComponent,
    PrzesylkiZagraniczneComponent,
    KontaktComponent,
    RegulaminComponent,
    SignerComponent,
    StickerNavComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
