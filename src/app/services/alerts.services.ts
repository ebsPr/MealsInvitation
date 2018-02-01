import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

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

    getAlertDeleteMeal(handlerOk,handlerKo){
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

    getAlertValidationDates(){
      return this.alertCtrl.create({
        title: 'Use this lightsaber?',
        message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
    }
}