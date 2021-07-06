import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Note } from '../../shared/note';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-note-form',
  template: `
     <div class="form-note" >
        <form [formGroup]="noteForm" (submit)="noteSubmit($event)">

          <ion-item class="color-components">
            <ion-input class="color-components color-common" placeholder="titulo..." formControlName="title" ></ion-input>
          </ion-item>

          <div class="color-components all-area">
            <ion-textarea class="color-components color-common all-area" rows="20" autocomplete="on" autocorrect="on" placeholder="contenido..." formControlName="body" (focusout)="handleFocus($event)"></ion-textarea>
          </div>

          <ion-item class="color-components color-text">
            <ion-datetime (ionCancel)="cancelDate($event)" class="color-components color-text" formControlName="alarm" display-format="DD/MM/YYYY HH:mm" placeholder="¿Quieres un aviso?" picker-format="YYYY-MM-DDTHH:mm" value="1990-02-19T07:43Z"></ion-datetime>
          </ion-item>

          <div class="div-actions">
            <ion-button class="color-button" type="submit"><ion-icon  name="checkmark-circle-outline"></ion-icon></ion-button>
          </div>
        </form>
      </div>
  `,
  styleUrls: ['./add-note-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNoteFormPage {

  @Output() saveNote = new EventEmitter();
  @Input() editNote: Note;
  @Input() set pendingForm(val: boolean) {
    if (this.noteForm) {
      this.noteForm[val ? 'disable' : 'enable']();
    }
  };

  update = false;
  noteForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    body: new FormControl(''),
    alarm: new FormControl(''),
    notificationId: new FormControl(''),
    time: new FormControl('')
  });


  constructor(public alertController: AlertController, public platform: Platform) {  }


  ngOnInit(): void{
    if(!this.editNote) this.noteForm.controls.notificationId.setValue(Math.random() * (0 - 1000000) + 1000000);
    // this.showAlarm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.editNote != null){
      if (Object.keys(changes.editNote?.currentValue || {})?.length > 0){
        const note = changes.editNote?.currentValue
        this.noteForm.patchValue(note)
        this.update = true;
      }else{
        this.update = false;
        this.noteForm.reset()
      }
    }
  }

  //cancelar notificacion
  async cancelDate(event){
    this.noteForm.controls.alarm.setValue('') //vaciamos el valor de la alarma del formulario de la nota
    await this.deleteNotification();
    // this.showAlarm();
  }

  async noteSubmit(event: Event){
    event.preventDefault();

    if(this.noteForm.invalid){
      if(!this.noteForm.value.title) this.handleButtonClick('rellena el titulo de la note')
    }else{

      this.noteForm.controls.time.setValue(new Date().getTime());

      if(this.noteForm?.value?.alarm && !await this.checkIsExistlocalNotification(this.noteForm.value?.notificationId?.toString())){
        // console.log('no existe y la activamos')
        this.notification()
      }else{
        if(this.noteForm?.value?.alarm){
          // console.log('si existe y la la borramos y creamos una nueva')
          this.deleteNotification()
          this.notification()
        }else{
          // console.log(' a sido borrada')
        }
      }

      // this.showAlarm()
      this.saveNote.next({note: this.noteForm.value, update: this.update })
      this.noteForm.reset();
    }
  }

  //alerta para rellenar los datos
  async handleButtonClick(message?: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message
    });
    await alert.present();
  }

 //crear notificacion alarma
  async notification(){
    let clockDate: any;
    if(this.noteForm.value?.alarm) clockDate = { at: new Date(this.noteForm.value?.alarm) }
    else clockDate = '';

    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Recordatorio de nota",
          body: this.noteForm.value?.body,
          id: this.noteForm.value?.notificationId,
          schedule: clockDate,
          sound: 'hawk1.wav',
          attachments: null,
          actionTypeId: "",
          extra: null,
          iconColor: '#61dafb'
        }
      ]
    });
  }

  //comprobar notificacion
  async checkIsExistlocalNotification(noteIdnotification: string){
    let existLocalNotification = false
    await LocalNotifications.getPending().then( res => {
      const notify = (res?.notifications || [])?.find(({id}) => id === Number(noteIdnotification))

      if(notify){
        existLocalNotification = true
      }else{
        existLocalNotification = false
      }
    }, err => {
        // console.log(err);
    })
    return existLocalNotification
  }

  deleteNotification(): void{
    LocalNotifications.getPending().then( res => { //borramos la notificacion
      const copyRes:{notifications: any} = { ...res};
      const notifyIndex = (res?.notifications || [])?.findIndex(({id}) => id?.toString() === this.noteForm?.value?.notificationId?.toString())

      // console.log(res?.notifications )
      // console.log(this.noteForm?.value?.notificationId?.toString())
      // console.log(res['notifications'][notifyIndex])

      if(notifyIndex !== -1){
        copyRes['notifications'] = [res['notifications'][notifyIndex]];
        LocalNotifications.cancel(copyRes)
      }

    }, err => {
        // console.log(err);
    })
  }

  // showAlarm(): void{
  //   LocalNotifications.getPending().then( res => { //borramos la notificacion
  //     console.log(res)
  //   })
  // }

  handleFocus(event: Event): void{
    console.log(event)
  }



}
