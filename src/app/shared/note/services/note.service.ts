import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Note } from '../models';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  readonly notes = 'clNotes';


  constructor() { }


  getNotes(): Observable<any>{
    return from(this.localNotes()).pipe(
      map(data => data || [])
    )
  }

  getNoteById(idNote: number): Observable<any>{
    return from(this.localNotes()).pipe(
      map(data => {
        let allNotes = data || []
        const note = allNotes?.find(({id}) => id === idNote) || {}
        return note || null
      })
    )
  }

  deleteNoteById(idNote: number): Observable<any>{
    return from(this.localNotes()).pipe(
      map(data => {
        let allNotes = data || []
        const noteIndex = allNotes?.findIndex(({id}) => id === idNote) || null
        let copyObject = [...allNotes]
        if(noteIndex > -1) {
          copyObject.splice(noteIndex,1)
          this.saveLocalNotes(copyObject)
          return {message:'nota borrada'}
        }
        else return {message:'error al borrar la nota'}
      })
    )
  }

  updateNote(note: Note): Observable<any>{
    return from(this.localNotes()).pipe(
      map(data => {
        const {id} = note
        let allNotes = data || [];
        const noteUpdateIndex = allNotes.findIndex((item) => item?.id === id)
        let copyObject = [...allNotes]
        copyObject[noteUpdateIndex] = note
        this.saveLocalNotes(copyObject)
        return {message:'nota actualizada'}
      })
    )
  }

   createNote(note: Note): Observable<any>{
     return from(this.localNotes()).pipe(
       map(data => {
        let allNotes = data || [];
        note = {...note, id: (allNotes[allNotes?.length -1]?.id || 0) + 1}
        let copyObject = [...allNotes]
        copyObject.push(note)
        this.saveLocalNotes(copyObject)
        return {message:'nota creada'}
       })
     )
  }

  async localNotes(){
    const notes = await Storage.get({key: this.notes})
    return await JSON.parse(notes?.value)
  }

  async saveLocalNotes(notes: Note[]){
    await Storage.set({key: this.notes, value: JSON.stringify(notes)})
  }

}
