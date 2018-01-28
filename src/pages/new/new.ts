import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from "moment";

import { DatesService } from "../../app/services/dates.services";
import { GochosService } from "../../app/services/gochos.services";
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

  formatEEUU: string = 'YYYY-MM-DD';
  formatEEUU2: string = 'MM/DD/YYYY';

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private datesService:DatesService,
    private gochosService:GochosService
  ) {
    // days until next friday
    let diff = 5 - moment().day();
   
    // dates in moment format
    let nextFriday = moment().add(diff, 'days');
    let nextSunday = nextFriday.clone().add(2, 'days');

    // parse dates for view
    this.initDate = nextFriday.format(this.formatEEUU);
    this.endDate = nextSunday.format(this.formatEEUU);

    this.arrayDays = this.datesService.getArrayDayObjects(nextFriday.toDate(),nextSunday.toDate());
  }

  // // COMPUTED PROPERTIES
  // get arrayDates() {
  //   let nextFriday = moment(this.initDate,this.formatEEUU);
  //   let nextSunday = moment(this.endDate,this.formatEEUU)
  //   let arrayDatesAux:Date[] = this.datesService.getArrayDates(nextFriday.toDate(),nextSunday.toDate());
  //   this.arrayDays = this.datesService.getArrayDayObjects(arrayDatesAux);
  //   return arrayDatesAux
  // };

  // METHODS
  updateArrayDays(){
    let nextFriday = moment(this.initDate,this.formatEEUU);
    let nextSunday =  moment(this.endDate,this.formatEEUU);
    this.arrayDays = this.datesService.getArrayDayObjects(nextFriday.toDate(),nextSunday.toDate());
    console.log('test')
  }
  save() {

    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push(HomePage)
          }
        }
      ]
    });
    confirm.present();
  }
}
