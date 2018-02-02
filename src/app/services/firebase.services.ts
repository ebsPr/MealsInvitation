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
        'Content-Type':'application/json',
        'Cache-Control': 'no-cache'
      });

    // save de a meal
    saveMeal(arrayDays:Day[], people:any[]){
        for(let d of arrayDays){
            d.dinner.people = Array.from(people);
            d.lunch.people = Array.from(people);
        }
        let body = JSON.stringify(arrayDays);
        
        return this.http.post(this.url+'.json',body, {headers:this.headers})
            .map( res => {
                return res.json()
            });
    }

    // get meals between two dates
    getMeals(){
        return this.http.get(this.url +'.json').map( res => res.json());
    }

    // update meal

    // delete
    deleteMeal(key$){
        let url = `${this.url}/${key$}.json`;
        return this.http.delete(url).map( res => res.json());
    }


}