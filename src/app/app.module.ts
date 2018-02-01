import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewPage } from "../pages/new/new";

import { FirebaseService } from "./services/firebase.services";
import { DatesService } from "./services/dates.services";
import { GochosService } from "./services/gochos.services";

import { KeysPipe } from "./pipes/keys.pipes";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPage,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatesService,
    GochosService,
    FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
