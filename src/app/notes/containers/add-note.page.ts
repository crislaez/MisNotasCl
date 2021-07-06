import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { fromNote, Note, NoteActions, NoteService } from '../../shared/note';

@Component({
  selector: 'app-add-note',
  template:`
  <ion-content [fullscreen]="true">
    <div class="container color-components" >

      <div class="header">
        <ion-back-button class="color-text" defaultHref="/notes" [text]="''"></ion-back-button>
        <div>
          <h1 class="color-common">Agregar nota</h1>
        </div>
        <ng-container *ngIf="(editNote$ | async) as editNote; else divClear">
          <ion-button  fill="clear" (click)="deleteNote(editNote?.id)"><ion-icon class="color-text" name="close-outline"></ion-icon></ion-button>
        </ng-container>
        <ng-template #divClear>
          <div class="div-clear"></div>
        </ng-template>
      </div>

      <app-add-note-form class="component-container"
      [pendingForm]="pendingForm$ | async"
      [editNote]="(editNote$ | async) "
      (saveNote)="saveNote($event)"
      ></app-add-note-form>

    </div>

  </ion-content>
  `,
  styleUrls: ['./add-note.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNotePage {

  pendingForm$: Observable<boolean> = this.store.pipe(select(fromNote.getPendingStatus));
  showTab = true

  editNote$: Observable<Note> = this. pendingForm$.pipe(
    filter(pending => !pending),
    switchMap(() =>
      this.route.queryParams.pipe(
        filter(({id}) => !!id),
        switchMap(({id}) =>
          this.store.pipe(select(fromNote.getNote(parseInt(id))),
            switchMap((note) => {
              if(Object.values(note)?.length === 0){
                return this._note.getNoteById(id).pipe(
                  tap(() => {
                    if(Object.values(note)?.length === 0) this.store.dispatch(NoteActions.redirectNotes())
                  })
                )
              }else{
                return [note]
              }
            })
          )
        )
      )
    )
  );


  constructor(private store: Store,
    private route: ActivatedRoute,
    private _note: NoteService,
    public alertController: AlertController) {
    // this.pendingForm$.subscribe(data => console.log(data))
  }


  saveNote({note, update}) {
    if(update) this.store.dispatch(NoteActions.updateNote({note}))
    else this.store.dispatch(NoteActions.createNote({note}));
  }

  async deleteNote(noteId){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message:'Seguro que quieres borrar la nota?',
      buttons: ['No', {
        text: 'Si',
        handler: (event) => {
          this.store.dispatch(NoteActions.deleteNote({idNote: noteId}))
        }
      }]
    });
    await alert.present()
  }



}
