import { Injectable } from '@angular/core';

@Injectable()
export class GochosService {

    constructor() { 

    }

    getGochos(){
        return [
            { id: 1, name: 'Iván'},
            { id: 2, name : 'Yago'},
            { id: 3, name: 'Ángel'},
            { id: 4, name: 'Víctor'}
        ]
    }
}