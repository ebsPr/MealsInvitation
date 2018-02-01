import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


import { Day } from "../classes/day.classes";

@Pipe({
    name: 'datemeal',
    
})

export class DateMealPipe implements PipeTransform {
    constructor( 

    ){

    }
    transform(value: Day[]): String {
        // console.log('value',value)
        let datePipe =  new DatePipe('es-ES');
        let dateIni = datePipe.transform(value[0].date,'EEEE d');
        let dateEnd = datePipe.transform(value[value.length-1].date,'EEEE d')
        return `de ${dateIni} a ${dateEnd}`;
    }
}