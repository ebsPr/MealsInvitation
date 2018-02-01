import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from "moment";

import { DatesService } from "../../app/services/dates.services";
import { GochosService } from "../../app/services/gochos.services";
import { FirebaseService } from "../../app/services/firebase.services";

import { HomePage } from "../home/home";

import { Day } from "../../app/classes/day.classes";
import { NgForm } from '@angular/forms/src/directives/ng_form';


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

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private datesService:DatesService,
    private gochosService:GochosService,
    private fireBaseService:FirebaseService
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

    this.people = Array.from(this.gochosService.getGochos());
  }

  // METHODS

  // update form with the correct inputs depending of dates
  updateArrayDays(){
    let nextFriday = moment(this.initDate,this.formatEEUU);
    let nextSunday =  moment(this.endDate,this.formatEEUU);
    this.arrayDays = this.datesService.getArrayDayObjects(nextFriday.toDate(),nextSunday.toDate());
  }

  // method that save into firebase database the meal
  save(forma:NgForm) {
    
    let confirm = this.alertCtrl.create({
      title: '¿Enviar notificación?',
      message: 'Vas a enviar la notificación a los gochos, ¿adelante?',
      buttons: [
        {
          text: 'No, todavía no',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sí, algo tendrán que comer',
          handler: () => {
            console.log('arrayDays - ',this.arrayDays);
            console.log('people - ',this.people)
            this.fireBaseService.saveMeal(this.arrayDays,this.people).subscribe(data => {
              console.log('ok!')
            })
            this.navCtrl.push(HomePage)
          }
        }
      ]
    });
    confirm.present();
  }
}
