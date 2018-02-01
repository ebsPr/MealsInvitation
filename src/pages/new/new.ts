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

  loading:boolean = true;

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
      console.log(' before meals')
      this.fireBaseService.getMeals().subscribe( data => {
        this.dataWeekends = _.flatMap(data, x => { return x} );
        console.log('  meals ended')
        resolve()
      });
    }).then( () => {
      console.log('init then')
      let datesValue = this.datesService.getNextWeekend(this.dataWeekends);

      // dates for view
      this.initDate = datesValue.nextFridayTxt
      this.endDate = datesValue.nextSundayTxt
  
      // days between init day and 
      this.arrayDays = this.datesService.getArrayDayObjects(datesValue.nextFriday.toDate(),datesValue.nextSunday.toDate());
  
      this.people = Array.from(this.gochosService.getGochos());
      console.log('end then')
    });
  }

  // METHODS

  validateDate(){
    console.log('validateDates new ',this.loading)
    if(this.loading === false){
      if(!this.datesService.validateDates(this.dataWeekends,moment(this.initDate,this.formatEEUU).toDate())){
        // console.log('equalDay',equalDay);
        let confirm = this.alertService.getAlertValidationDates();;
        confirm.present();
      }else{
        // console.log('NOT FOUND')
      }
    }
    this.loading = false;
  }
  // update form with the correct inputs depending of dates
  updateArrayDays(){
    console.log('updateArrayDays',)

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
