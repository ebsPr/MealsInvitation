import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';

import * as moment from "moment";
import * as _ from "lodash"

import { DatesService } from "../../app/services/dates.services";
import { GochosService } from "../../app/services/gochos.services";
import { FirebaseService } from "../../app/services/firebase.services";
import { AlertsService } from "../../app/services/alerts.services";

import { Day } from "../../app/classes/day.classes";

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage implements OnInit{

  // FORM
  initDate: string;
  endDate: string;

  arrayDays:Day[];

  people:any[];

  dataWeekends;

  loading:number = 0;

  formatEEUU: string = 'YYYY-MM-DD';
  formatEEUU2: string = 'MM/DD/YYYY';

  loader = this.loadingCtrl.create({
    content: "guardando..."
  });

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private datesService:DatesService,
    private gochosService:GochosService,
    private fireBaseService:FirebaseService,
    private loadingCtrl: LoadingController,
    private alertService: AlertsService,
    public navParams: NavParams
  ) {

  
  }

  ngOnInit() {

    new Promise((resolve, reject) => {
      this.fireBaseService.getMeals().subscribe( data => {
        this.dataWeekends = _.flatMap(data, x => { 
          return { init: x[0].date, end: x[x.length-1].date}
        } );
        resolve()
      });
    }).then( () => {

      let datesValue = this.datesService.getNextWeekend(this.dataWeekends);

      // dates for view
      this.initDate = datesValue.nextFridayTxt
      this.endDate = datesValue.nextSundayTxt
  
      // days between init day and 
      this.arrayDays = this.datesService.getArrayDayObjects(datesValue.nextFriday.toDate(),datesValue.nextSunday.toDate());
  
      this.people = Array.from(this.gochosService.getGochos());

    });
  }

  // METHODS

  validateDate(){

    if(this.loading > 2){
      let initDateMoment = moment(this.initDate,this.formatEEUU);
      let endDateMoment = moment(this.endDate,this.formatEEUU);
      if(!this.datesService.validateDates2(this.dataWeekends,initDateMoment,endDateMoment)){
        let confirm = this.alertService.getAlertValidationDates();
        if(confirm)
          confirm.present();
        
        console.log('test')
      }
    }
    this.loading++;
  }
  // update form with the correct inputs depending of dates
  updateArrayDays(){

    let initDateMoment = moment(this.initDate);
    let diff = initDateMoment.day ()== 6 ? 1 : 2;

    // update end date adding 2 days 
    this.endDate = initDateMoment.add(diff,'days').format(this.formatEEUU);

    let nextFriday = moment(this.initDate,this.formatEEUU);
    let nextSunday =  moment(this.endDate,this.formatEEUU);
    this.arrayDays = this.datesService.getArrayDayObjects(nextFriday.toDate(),nextSunday.toDate());
    
  }

  // method that save into firebase database the meal
  save(forma:NgForm) {
    
    let handlerOk = () => { 
      this.loader.present();
      this.fireBaseService.saveMeal(this.arrayDays,this.people)
        .subscribe(data => {
          this.navParams.get('resolve')( this.loader); // resolve the promise home --> home'll update data 
          this.navCtrl.pop();
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
