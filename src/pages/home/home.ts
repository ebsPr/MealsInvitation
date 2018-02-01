import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewPage } from "../new/new";

import { FirebaseService } from "../../app/services/firebase.services";
import { GochosService } from "../../app/services/gochos.services";

import { Day } from "../../app/classes/day.classes";
import { Person } from "../../app/classes/person.classes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  meals:Day[];
  gochos:Person[];

  constructor(
    public navCtrl: NavController, 
    public firebaseService: FirebaseService,
    public gochosService: GochosService
  ) {
    this.firebaseService.getMeals()
    .subscribe( data => {
      this.meals = data
      console.log(this.meals)
    }
    );
    this.gochos = this.gochosService.getGochos();
  }

  newMeal(){
    this.navCtrl.push(NewPage);
  }

  thumbs(people: Person[], id:string){
    return people.find( x => x.id == id).selected;
  }
}
