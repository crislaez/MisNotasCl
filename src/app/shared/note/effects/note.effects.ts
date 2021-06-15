import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { NoteActions } from '../actions';
import { NoteService } from '../services/note.service';
import { of } from 'rxjs';
import { AlertController } from '@ionic/angular';import { Router } from '@angular/router';
;


@Injectable()
export class NoteEffects {

  loadNotes$ = createEffect( () =>
    this.actions$.pipe(
      ofType(NoteActions.loadNotes, NoteActions.createNoteSuccess, NoteActions.updateNoteSuccess, NoteActions.deleteSuccess),
      switchMap( () =>
        this._note.getNotes().pipe(
          map( (notes) => NoteActions.saveNotes({ notes}) ),
          catchError( () => [NoteActions.saveNotes({ notes: []})] ),
        )
      )
    )
  );

  createNews$ = createEffect( () =>
    this.actions$.pipe(
      ofType(NoteActions.createNote),
      switchMap( ({note}) =>
        this._note.createNote(note).pipe(
          map( () =>  NoteActions.createNoteSuccess({ message: 'Nota creada'}) ),
          catchError( (error) => [NoteActions.createNoteFailure({error})])
        )
      )
    )
  );

  updateNote$ = createEffect( () =>
    this.actions$.pipe(
      ofType(NoteActions.updateNote),
      switchMap( ({note}) =>
        this._note.updateNote(note).pipe(
          map( () =>  NoteActions.updateNoteSuccess({ message: 'Nota actualizada'}) ),
          catchError( (error) => [NoteActions.updateNoteFailure({error})])
        )
      )
    )
  );

  deleteNote$ = createEffect( () =>
    this.actions$.pipe(
      ofType(NoteActions.deleteNote),
      switchMap( ({idNote}) =>
        this._note.deleteNoteById(idNote).pipe(
          map( () =>  NoteActions.deleteSuccess({ message: 'Nota borrada'}) ),
          catchError( (error) => [NoteActions.deleteFailure({error})])
        )
      )
    )
  );

  // message$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(NoteActions.deleteSuccess, NoteActions.updateNoteSuccess),
  //     // map(({message}: any) => DialogsActions.notifyUser({ message , title:'Aviso' }) ),
  //   ),
  //   {dispatch: false}
  // );

  redirectoTo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.createNoteSuccess, NoteActions.updateNoteSuccess, NoteActions.updateNoteFailure, NoteActions.redirectNotes),
      tap( () => this.router.navigate(['/notes']))
    ), {dispatch: false}
  );

  messageFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActions.createNoteFailure, NoteActions.deleteFailure, NoteActions.deleteFailure),
      tap(({error}: any) => {
        this.alertController.create({
          header: 'Alerta',
          message: error,
        });
      }),
    ),
    {dispatch: false}
  );


  loadNotesInit$ = createEffect(() =>
    of(NoteActions.loadNotes())
  );


  constructor(
    private actions$: Actions,
    private _note: NoteService,
    private router: Router,
    public alertController: AlertController
  ){}
}
