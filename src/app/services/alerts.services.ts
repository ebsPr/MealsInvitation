import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Day } from "../../app/classes/day.classes";

@Injectable()
export class AlertsService {

    constructor(
        public alertCtrl: AlertController,
    ) { }

    getAlertCreate(handlerOk,handlerKo){
       return this.alertCtrl.create({
            title: '¿Enviar notificación?',
            message: 'Vas a enviar la notificación a los gochos, ¿adelante?',
            buttons: [
              {
                text: 'No, todavía no',
                handler: () => {
                  handlerKo()
                }
              },
              {
                text: 'Sí, algo tendrán que comer',
                handler: () => {
                  handlerOk()
                  
                }
              }
            ]
          });
    }

    getDeleteMeal(handlerOk,handlerKo){
        return this.alertCtrl.create({
            title: '¿Eliminar esta comida?',
            message: 'Vas a eliminar la comida del finde XXX a XXX, ¿estás segura?',
            buttons: [
              {
                text: 'No, me he equivocado!',
                handler: () => {
                    handlerKo()
                }
              },
              {
                text: 'Si, elimina!',
                handler: () => {
                    handlerOk()
                }
              }
            ]
          });
    }

}