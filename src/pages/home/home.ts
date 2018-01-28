import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewPage } from "../new/new";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  newMeal(){
    this.navCtrl.push(NewPage);
  }
}
