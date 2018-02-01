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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  meals:Day[];
  gochos:Person[];

  loading:boolean = true;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public firebaseService: FirebaseService,
    public gochosService: GochosService,
    private alertService: AlertsService,
    private loadingCtrl: LoadingController,
  ) {
    console.log('constructor home')
    // get data from services
    this.firebaseService.getMeals()
      .subscribe( data => {
        this.meals = data
        console.log('constructor home data: ', data)
        this.loading = false;
      });
    this.gochos = this.gochosService.getGochos();
  }

  ngOnInit(){
    console.log('onInit home')
  }

  // method that navigate to new meal page
  newMeal(){
    this.navCtrl.push(NewPage);
  }

  // method that returns if a person has been selected to send the meal notification
  thumbs(people: Person[], id:string){
    return people.find( x => x.id == id).selected;
  }

  // method that calls delete service
  deleteMeal(key$){
    let handlerOk = () => {
      let loader = this.loadingCtrl.create({
        content: "Cargando..."
      });
      loader.present()
      this.firebaseService.deleteMeal(key$)
        .subscribe(data => {
          console.log('delete ok ',data);
          delete this.meals [key$]
          loader.dismiss();
        });
      
    }
    handlerOk.bind(this);

    let handlerKo = () => {
      console.log('KO')
    }

    let confirm = this.alertService.getDeleteMeal(handlerOk,handlerKo);
    confirm.present();


    
  }
}
