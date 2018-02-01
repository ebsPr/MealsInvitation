import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { NewPage } from "../new/new";

import { FirebaseService } from "../../app/services/firebase.services";
import { GochosService } from "../../app/services/gochos.services";

import { Day } from "../../app/classes/day.classes";
import { Person } from "../../app/classes/person.classes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  meals:Day[];
  gochos:Person[];

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public firebaseService: FirebaseService,
    public gochosService: GochosService
  ) {
    console.log('constructor home')

    // get data from services
    this.firebaseService.getMeals().subscribe( data => {
      this.meals = data
      console.log('constructor home data: ', data)
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
    let confirm = this.alertCtrl.create({
      title: '¿Eliminar esta comida?',
      message: 'Vas a eliminar la comida del finde XXX a XXX, ¿estás segura?',
      buttons: [
        {
          text: 'No, me he equivocado!',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si, elimina!',
          handler: () => {
            console.log('Agree clicked');
            this.firebaseService.deleteMeal(key$).subscribe(data => console.log('delete ok ',data))
            delete this.meals [key$]
          }
        }
      ]
    });
    confirm.present();


    
  }
}
