import { Injectable } from '@angular/core';

import { Http, Headers} from "@angular/http";
import "rxjs/Rx";

import { Day } from "../classes/day.classes";

@Injectable()
export class FirebaseService {

    constructor(
        private http:Http
    ) { 

    }

    url: string = 'https://meals-34def.firebaseio.com/meals'
    headers = new Headers({
        'Content-Type':'application/json'
      });

    // save de a meal
    saveMeal(arrayDays:Day[], people:any[]){
        for(let d of arrayDays){
            d.dinner.people = Array.from(people);
            d.lunch.people = Array.from(people);
        }
        let body = JSON.stringify(arrayDays);
        console.log('body',body)
        return this.http.post(this.url+'.json',body, {headers:this.headers})
        .map( res => {
          console.log(res.json())
          return res.json()
        });
    }


}