import { Injectable } from '@angular/core';
import { Person } from "../classes/person.classes";

@Injectable()
export class GochosService {

    constructor() { 

    }

    getGochos():Person[]{
        return [
            { id: '1', name: 'Iván',selected:true,attendance:null},
            { id: '2', name : 'Yago',selected:true,attendance:null},
            { id: '3', name: 'Ángel',selected:true,attendance:null},
            { id: '4', name: 'Víctor',selected:true,attendance:null}
        ]
    }
}