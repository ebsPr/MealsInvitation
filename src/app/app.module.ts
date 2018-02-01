import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEs);

// COMPONENTS
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewPage } from "../pages/new/new";

//SERVICES
import { FirebaseService } from "./services/firebase.services";
import { DatesService } from "./services/dates.services";
import { GochosService } from "./services/gochos.services";
import { AlertsService } from "./services/alerts.services";

//PIPES
import { KeysPipe } from "./pipes/keys.pipes";
import { DateMealPipe } from "./pipes/datemeal.pipes";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPage,
    KeysPipe,
    DateMealPipe
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
    AlertsService,
    FirebaseService,
    { provide: LOCALE_ID, useValue: 'es-ES' } ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
