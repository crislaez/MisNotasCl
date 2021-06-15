import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesPage } from './containers/notes.page';
import { NotePage } from './containers/note.page';
import { AddNotePage } from './containers/add-note.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        component: NotesPage
      },
      {
        path:'add',
        component: AddNotePage
      },
      {
        path:':name',
        component: NotePage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
