import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';

import * as moment from "moment";

import { DatesService } from "../../app/services/dates.services";
import { GochosService } from "../../app/services/gochos.services";
import { FirebaseService } from "../../app/services/firebase.services";
import { AlertsService } from "../../app/services/alerts.services";

import { HomePage } from "../home/home";

import { Day } from "../../app/classes/day.classes";



@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage {

  // FORM
  initDate: string;
  endDate: string;

  arrayDays:Day[];

  people:any[];

  formatEEUU: string = 'YYYY-MM-DD';
  formatEEUU2: string = 'MM/DD/YYYY';

  loader = this.loadingCtrl.create({
    content: "Cargando..."
  });

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private datesService:DatesService,
    private gochosService:GochosService,
    private fireBaseService:FirebaseService,
    private loadingCtrl: LoadingController,
    private alertService: AlertsService
  ) {
    let datesValue = this.datesService.getNextWeekend();

    // dates for view
    this.initDate = datesValue.nextFridayTxt
    this.endDate = datesValue.nextSundayTxt

    // days between init day and 
    this.arrayDays = this.datesService.getArrayDayObjects(datesValue.nextFriday.toDate(),datesValue.nextSunday.toDate());

    this.people = Array.from(this.gochosService.getGochos());
  }

  // METHODS

  // update form with the correct inputs depending of dates
  updateArrayDays(){

    // update end date adding 2 days 
    this.endDate = moment(this.initDate).add(2,'days').format(this.formatEEUU);

    let nextFriday = moment(this.initDate,this.formatEEUU);
    let nextSunday =  moment(this.endDate,this.formatEEUU);
    this.arrayDays = this.datesService.getArrayDayObjects(nextFriday.toDate(),nextSunday.toDate());
  }

  // method that save into firebase database the meal
  save(forma:NgForm) {

    
    let handlerOk = () => {
      console.log('arrayDays - ',this.arrayDays);
      console.log('people - ',this.people)
 
      this.loader.present();
      this.fireBaseService.saveMeal(this.arrayDays,this.people).subscribe(data => {
        this.loader.dismiss();
        this.navCtrl.push(HomePage)
      })
    }
    handlerOk.bind(this)

    let handlerKo = () => {
      console.log('KO')
    }
    
    let confirm = this.alertService.getAlertCreate(handlerOk,handlerKo);
    confirm.present();
  }

  
}
