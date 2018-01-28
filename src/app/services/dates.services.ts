import { Injectable } from '@angular/core';
// import { Day } from "../classes/day.classes";

@Injectable()
export class DatesService {

    constructor() {

    }

    getArrayDayObjects(startDate: Date, endDate: Date){
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
                lunch:true,
                dinner:true
            });
            currentDate = addDays.call(currentDate, 1);
        }
        console.log('getArrayDates',dates)
        return result;
    }
}