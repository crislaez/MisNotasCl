import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonCard } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fromNote, Note, NoteActions } from 'src/app/shared/note';
import { trackById } from '../../shared/shared/utils/utils';


@Component({
  selector: 'app-notes',
  template: `
   <ion-content [fullscreen]="true">

    <ng-container *ngIf="(notes$ | async) as notes; else loader">
      <ng-container *ngIf="!(pending$ | async); else loader">
        <ng-container *ngIf="notes?.length > 0; else noNotes">

          <div class="container content-align">
            <div class="div-empty-header">
            </div>

            <!-- <ion-card #cards class="ion-activatable ripple-parent fade-in" *ngFor="let note of notes; let i = index; trackBy: trackById" (press)="deleteNote($event, note, i)" (click)="updateNote(note)">
              <ion-ripple-effect></ion-ripple-effect>
              <ion-card-header class="header-card">
                <ion-card-title>{{cutTitle(note?.title)}}</ion-card-title>
              </ion-card-header>
              <ion-card-content>{{note?.time | date}}</ion-card-content>
            </ion-card> -->
            <ion-list class="fade-in">
              <ion-item-sliding *ngFor="let note of notes; let i = index; trackBy: trackById">

                <ion-item-options side="start">
                  <ion-item-option (click)="updateNote(note)">Editar</ion-item-option>
                </ion-item-options>

                <ion-item class="ion-activatable ripple-parent ion-item" (click)="updateNote(note)">
                  <ion-ripple-effect></ion-ripple-effect>
                  <ion-icon name="document-text-outline"></ion-icon>
                  <ion-label>{{cutTitle(note?.title)}}</ion-label>
                  <ion-label>{{note?.time | date}}</ion-label>
                </ion-item>

                <ion-item-options side="end">
                  <ion-item-option color="danger" (click)="deleteNote($event, note, i)">Borrar</ion-item-option>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>
          </div>

       </ng-container>
      </ng-container>
    </ng-container>

    <!-- NO NOTES -->
    <ng-template #noNotes>
      <div class="error-serve">
        <span >No hay notas, puedes añadir una haciendo click en el boton de abajo</span>
      </div>
    </ng-template>

    <!-- LOADER  -->
    <ng-template #loader>
      <ion-spinner class="color-text" name="lines"></ion-spinner>
    </ng-template>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button color-button-text" [routerLink]="['/notes/add']"> <ion-icon name="add"></ion-icon></ion-fab-button>
    </ion-fab>

   </ion-content>
  `,
  styleUrls: ['./notes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPage {

  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;
  @ViewChild('title') title: ElementRef;

  longPressActive = false;
  trackById = trackById
  pending$: Observable<boolean> = this.store.pipe(select(fromNote.getPending))
  notes$: Observable<Note[]> = this.store.pipe(select(fromNote.getNotes),
    tap((notes) => {
        if(!notes){
          this.store.dispatch(NoteActions.loadNotes())
        }
    })
  )

  constructor(private store: Store,
    public alertController: AlertController,
    private router: Router ) {
    // this.notes$.subscribe(data => console.log(data))

  }

  async deleteNote(event: Event, note: Note, index: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message:'Seguro que quieres borrar la nota?',
      buttons: ['No', {
        text: 'Si',
        handler: (event) => {
          this.store.dispatch(NoteActions.deleteNote({idNote: note?.id}))
        }
      }]
    });

    // setTimeout( async() => {await alert.present()},500);
    await alert.present()
  }

  updateNote(note): void{
    this.router.navigate(['/notes/add'], {queryParams:{id: note?.id}})
  }

  cutTitle(title: string): string{
    if(title?.length >= 9) return title?.split('')?.slice(0, 7).join('') + ' ...'
    return title
  }


}
