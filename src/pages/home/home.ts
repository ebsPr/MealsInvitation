import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { NewPage } from "../new/new";

import { FirebaseService } from "../../app/services/firebase.services";
import { GochosService } from "../../app/services/gochos.services";
import { AlertsService } from "../../app/services/alerts.services";

import { Day } from "../../app/classes/day.classes";
import { Person } from "../../app/classes/person.classes";
import { Loading } from 'ionic-angular/components/loading/loading';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  meals:Day[];
  gochos:Person[];

  loading:boolean = true;

  loader:Loading;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public firebaseService: FirebaseService,
    public gochosService: GochosService,
    private alertService: AlertsService,
    private loadingCtrl: LoadingController
  ) {

    // get weekends data
    this.getData(undefined)
    // get people data
    this.gochos = this.gochosService.getGochos();
  }

  ngOnInit(){
    
  }

  // method that navigate to new meal page
  newMeal(){
    // create a promise to update de data when the newPage ends
    new Promise((resolve, reject) => {
      this.navCtrl.push(NewPage, {resolve: resolve})
    }).then( (data:Loading) => {
      // get new Data
      this.getData(data);
    });
  }


  // method that returns if a person has been selected to send the meal notification
  thumbs(people: Person[], id:string){
    let p = people.find( x => x.id == id);
    if(p.selected && p.attendance === 'true'){
      return 1 // thumbs up
    }else if( p.selected && p.attendance === 'false'){
      return 2 // thumps down
    }else if (p.selected && p.attendance === 'undefined'){
      return 3; // question mark
    }else {
      return 4 // cross, p is not invited
    }
  }

  // method that calls delete service
  deleteMeal(key$){

    // handler when action delete ends ok
    let handlerOk = () => {
      this.createLoading();
      this.firebaseService.deleteMeal(key$)
        .subscribe(data => {
          delete this.meals [key$]
          this.removeLoading();
        });
      
    }
    handlerOk.bind(this);

    // handler when action delete ends KO
    let handlerKo = () => {
      console.log('KO')
    }

    // create an alert to validate the user action
    let confirm = this.alertService.getAlertDeleteMeal(handlerOk,handlerKo);
    confirm.present();    
  }

  // private method to create a loading alert
  createLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

  // private method to remove the loading alert
  removeLoading(){
    this.loader.dismiss();
    this.loader = undefined;
  }

  // method that calls the get all weekend service 
  // if we pass a loading will use that one otherwise creates one
  getData(loader:Loading){
      if(!loader)
        this.createLoading();
      // get data from services
      this.firebaseService.getMeals()
      .subscribe( data => {
        this.meals = data
        this.loading = false;
        if(loader){
          loader.dismiss();
        }else{
          this.removeLoading();
        }
      });
  }
}
