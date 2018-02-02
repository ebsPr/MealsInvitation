import { Injectable } from '@angular/core';
import { Day } from '../classes/day.classes';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
 
const moment = extendMoment(Moment);

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
        return result;
    }

    getNextWeekend(dataWeekends){
        // days until next friday
        let diff = 5 - moment().day();
        
        // dates in moment format
        let nextFriday = moment().add(diff, 'days').startOf('day');
        let nextSunday = nextFriday.clone().add(2, 'days');

        if(!this.validateDates2(dataWeekends,nextFriday,nextSunday)){
            nextFriday = this.getNextFridayFree(dataWeekends,nextFriday,nextSunday);
        }

        

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
    getNextFridayFree(dataWeekends,date,date2){
        if(!this.validateDates2(dataWeekends,date,date2)){
            return this.getNextFridayFree(dataWeekends,date.add(7,'days'),date2.add(9,'days'));
        }else{
            return date;
        }
    }

    validateDates2(dataWeekends,date1,date2){
        let range1 = moment.range(date1,date2);
        let result = dataWeekends.find(x => {
                let init = moment(x.init);
                let end = moment(x.end);
                let range2 = moment.range(init,end)
                return range1.overlaps(range2);
        });
        return result === undefined && !date1.isBefore(moment().startOf('day'));
    }

    
}