import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotesPageRoutingModule } from './notes-routing.module';
import { NotesPage } from './containers/notes.page';
import { AddNotePage } from './containers/add-note.page';
import { AddNoteFormPage } from './components/add-note-form.page';
import { NoteModule } from '../shared/note/note.module'
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    NoteModule,
    NotesPageRoutingModule
  ],
  declarations: [
    NotesPage,
    AddNotePage,
    AddNoteFormPage
  ]
})
export class NotesPageModule {}
