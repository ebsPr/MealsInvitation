import { Injectable } from '@angular/core';
import { Day } from '../classes/day.classes';
import * as moment from "moment";
// import { Day } from "../classes/day.classes";

@Injectable()
export class DatesService {

    formatEEUU: string = 'YYYY-MM-DD';

    constructor() {

    }

    getArrayDayObjects(startDate: Date, endDate: Date): Day[]{
        let result = new Array();
        let dates = [];
        let currentDate = startDate;
        var addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            result.push({
                date:currentDate,
                lunch: { activated: true } ,
                dinner: { activated: true } 
            });
            currentDate = addDays.call(currentDate, 1);
        }
        console.log('getArrayDates',dates)
        return result;
    }

    getNextWeekend(){
        // days until next friday
        let diff = 5 - moment().day();
        
        // dates in moment format
        let nextFriday = moment().add(diff, 'days');
        let nextSunday = nextFriday.clone().add(2, 'days');

        // parse dates for view
        let result ={
            nextFriday: nextFriday,
            nextFridayTxt: nextFriday.format(this.formatEEUU),
            nextSunday: nextSunday,
            nextSundayTxt: nextSunday.format(this.formatEEUU)
        }; 

        return result;
    }
}