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

    getNextWeekend(dataWeekends){
        // days until next friday
        let diff = 5 - moment().day();
        
        // dates in moment format
        let nextFriday = moment().add(diff, 'days');

        if(!this.validateDates(dataWeekends,nextFriday.toDate())){
            nextFriday = this.getNextFridayFree(dataWeekends,nextFriday);
        }

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

    // recursive method to get the first free friday
    getNextFridayFree(dataWeekends,date){
        console.log('getNextFridayFree',date)
        if(!this.validateDates(dataWeekends,date.toDate())){
            return this.getNextFridayFree(dataWeekends,date.add(7,'days'))
        }else{
            console.log('getNextFridayFree return ',date)
            return date;
        }
    }

    validateDates(dataWeekends,date){
        return  dataWeekends.find(x => {
            let date1 = moment(x.date).format(this.formatEEUU);
            let date2 = moment(date).format(this.formatEEUU);
            return date1 === date2
          }) === undefined;
    }
}